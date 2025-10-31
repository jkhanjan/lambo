/**
 * Main Application Store using Zustand
 * 
 * This store manages all global application state including:
 * - Active model selection
 * - Color customization
 * - Camera views and transitions
 * - UI state
 * 
 * Zustand provides a simple, performant state management solution
 * without the boilerplate of Redux or the limitations of Context API.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MODELS, getModelById } from "../config/models.config";

const useAppStore = create(
  devtools(
    (set, get) => ({
      // ============================================
      // MODEL STATE
      // ============================================
      activeModelId: MODELS[0].id, // Default to first model
      modelOpacity: 1,

      /**
       * Set the active model
       * @param {string} modelId - ID of the model to activate
       */
      setActiveModel: (modelId) => {
        const model = getModelById(modelId);
        if (!model) {
          console.error(`Model with id "${modelId}" not found`);
          return;
        }

        set(
          {
            activeModelId: modelId,
            // Reset color to model's default when switching
            selectedColor: model.properties.defaultColor,
          },
          false,
          "setActiveModel"
        );
      },


      /**
       * Set model opacity (for transitions)
       * @param {number} opacity - 0 to 1
       */
      setModelOpacity: (opacity) => {
        set({ modelOpacity: opacity }, false, "setModelOpacity");
      },

      // ============================================
      // COLOR STATE
      // ============================================
      selectedColor: MODELS[0].properties.defaultColor,
      colorSliderValue: 0,

      /**
       * Set the selected color
       * @param {string} color - Hex color code
       */
      setSelectedColor: (color) => {
        set({ selectedColor: color }, false, "setSelectedColor");
      },

      /**
       * Set color slider value (0-100)
       * @param {number} value - Slider value
       */
      setColorSliderValue: (value) => {
        set({ colorSliderValue: value }, false, "setColorSliderValue");
      },


      // ============================================
      // CAMERA STATE
      // ============================================
      cameraView: "default",
      isTransitioning: false,
      availableViews: ["default", "sideView", "topView", "backView"],
      viewNames: {
        default: "Default View",
        sideView: "Side View",
        topView: "Top View",
        backView: "Back View",
      },

      /**
       * Set camera view
       * @param {string} view - View name
       */
      setCameraView: (view) => {
        set(
          {
            cameraView: view,
            isTransitioning: true,
          },
          false,
          "setCameraView"
        );

        // Auto-disable transition after 1 second
        setTimeout(() => {
          set({ isTransitioning: false }, false, "endTransition");
        }, 1000);
      },

      /**
       * Cycle to next camera view
       */
      nextCameraView: () => {
        const { cameraView, availableViews } = get();
        const currentIndex = availableViews.indexOf(cameraView);
        const nextIndex = (currentIndex + 1) % availableViews.length;
        get().setCameraView(availableViews[nextIndex]);
      },


      /**
       * Set transition state
       * @param {boolean} isTransitioning
       */
      setIsTransitioning: (isTransitioning) => {
        set({ isTransitioning }, false, "setIsTransitioning");
      },

      // ============================================
      // UI STATE
      // ============================================
      isUIVisible: true,
      isLoading: false,

      /**
       * Toggle UI visibility
       */
      toggleUI: () => {
        set((state) => ({ isUIVisible: !state.isUIVisible }), false, "toggleUI");
      },

      /**
       * Set loading state
       * @param {boolean} isLoading
       */
      setLoading: (isLoading) => {
        set({ isLoading }, false, "setLoading");
      },

      // ============================================
      // UTILITY ACTIONS
      // ============================================

      /**
       * Reset all state to defaults
       */
      reset: () => {
        set(
          {
            activeModelId: MODELS[0].id,
            selectedColor: MODELS[0].properties.defaultColor,
            colorSliderValue: 0,
            cameraView: "default",
            isTransitioning: false,
            modelOpacity: 1,
            isUIVisible: true,
            isLoading: false,
          },
          false,
          "reset"
        );
      },
    }),
    {
      name: "app-store", // Name for Redux DevTools
      enabled: process.env.NODE_ENV === "development", // Only in dev
    }
  )
);

export default useAppStore;
