import {StagingStep} from "@/model/response/step/ReadStagingStepsByMenuCodeResponse.tsx";


export class ManageApplicationUtil {

 static restructureSteps(steps: StagingStep[]): StagingStep[] {
    // Create a map for quick step lookup
    const stepsMap = new Map(steps.map(step => [step.stagingStepCode, step]));

    // Function to parse and resolve condition steps
    function resolveConditionSteps(conditionStr: string | null | undefined, parentStep: StagingStep): StagingStep[] {
        if (!conditionStr) {
            // If no condition, check if there's a nextStep
            if (parentStep.stagingStepNextStep) {
                const nextStep = stepsMap.get(parentStep.stagingStepNextStep);
                return nextStep ? [nextStep] : [];
            }
            return [];
        }

        try {
            const conditionObj: Record<string, string> = JSON.parse(conditionStr);
            return Object.values(conditionObj).map(value => {
                const [stagingStepCode] = value.split('-');
                const step = stepsMap.get(stagingStepCode);

                // Recursively process children if the step has a condition
                if (step && step.stagingStepCondition) {
                    const processedStep: StagingStep = {...step};
                    processedStep.children = resolveConditionSteps(step.stagingStepCondition, step);
                    delete processedStep.stagingStepCondition;
                    return processedStep;
                }

                return step;
            }).filter((step): step is StagingStep => step !== undefined);
        } catch (error) {
            console.error('Error parsing condition:', error);
            return [];
        }
    }

    // Build the workflow list
    function buildWorkflowList(currentStep: StagingStep): StagingStep[] {
        if (!currentStep) return [];

        // Process the current step
        const processedStep: StagingStep = {...currentStep};

        // If there's a condition, process it
        if (processedStep.stagingStepCondition) {
            processedStep.children = resolveConditionSteps(processedStep.stagingStepCondition, processedStep);
            delete processedStep.stagingStepCondition;
        } else if (processedStep.stagingStepNextStep) {
            // If no condition, check for nextStep
            const nextStep = stepsMap.get(processedStep.stagingStepNextStep);
            if (nextStep) {
                processedStep.children = [nextStep];
            }
        }

        // Remove nextStep property
        delete processedStep.stagingStepNextStep;

        // If children exist, process them
        if (processedStep.children) {
            processedStep.children = processedStep.children.map(child => {
                const { stagingStepNextStep, ...rest } = child;
                return rest;
            });
        }

        return [processedStep];
    }

    // Find the entry point (first step - the one without a next step)
    const entryStep = steps.find(step => !step.stagingStepNextStep);

    // Start building from the entry step
    return entryStep ? buildWorkflowList(entryStep) : [];
}

}