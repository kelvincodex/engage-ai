import loadEnv from '../../../loadEnv.ts';

// Load environment variables
loadEnv(process.env.NODE_ENV || 'development');


import {HelperUtil} from ".//HelperUtil";

export default {
    colorPalette:{
      primary_color_900: HelperUtil.colorPaletteFromEnv(process.env.VITE_APP_COLOR_PALETTE ?? "")?.primary_color_900,
      primary_color_800: HelperUtil.colorPaletteFromEnv(process.env.VITE_APP_COLOR_PALETTE ?? "")?.primary_color_800,
      primary_color_700: HelperUtil.colorPaletteFromEnv(process.env.VITE_APP_COLOR_PALETTE ?? "")?.primary_color_700,
      primary_color_200: HelperUtil.colorPaletteFromEnv(process.env.VITE_APP_COLOR_PALETTE ?? "")?.primary_color_200,
      secondary_color_800: HelperUtil.colorPaletteFromEnv(process.env.VITE_APP_COLOR_PALETTE ?? "")?.secondary_color_800,
      secondary_color_900: HelperUtil.colorPaletteFromEnv(process.env.VITE_APP_COLOR_PALETTE ?? "")?.secondary_color_900,
    },
};