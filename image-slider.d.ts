declare module '@lindelwa122/image-slider' {
  type Image = { src: string; alt?: string };

  /**
   * Creates an image slider with the specified dimensions and images.
   *
   * @param {string} height - The height of the image slider container (e.g., '350px').
   * @param {string} width - The width of the image slider container (e.g., '450px').
   * @param {...Image} images - Image objects in the format { src: 'image_url', alt: 'image_description' }.
   * @throws Will throw an error if image objects are not provided or if they don't have the src attribute.
   * @returns {Object} An object with methods to manage the image slider.
   */
  export default function imageSlider(
    height: string,
    width: string,
    ...images: Image[]
  ): {
    /**
     * Adds the image slider to the specified parent element using its selector.
     *
     * @param {string} selectors - The CSS selector of the parent element where the image slider will be appended.
     */
    append(selectors: string): void;

    /**
     * Creates an interval to automatically advance the image in the slider.
     *
     * @param {number} [ms=1000] - The number of milliseconds between each image update.
     * @returns {number} An interval ID that can be used with clearInterval to stop the automatic image updates.
     */
    auto(ms?: number): number;

    /**
     * Updates the slider configuration with the specified new settings.
     *
     * @param {Object} updatedConfig - The updated configurations for the slider.
     * @param {boolean} updatedConfig.animation - Whether to enable animation.
     * @param {number} updatedConfig.animationDuration - The duration of the animation in milliseconds.
     * @param {"cover" | "none" | "fill" | "contain"} updatedConfig.imageFit - The image fit mode.
     * @param {boolean} updatedConfig.showCounter - Whether to display the image counter.
     * @param {boolean} updatedConfig.showControls - Whether to display navigation controls.
     * @param {boolean} updatedConfig.showDots - Whether to display navigation dots.
     */
    updateConfig(updatedConfig: {
      animation?: boolean;
      animationDuration?: number;
      imageFit?: 'cover' | 'none' | 'fill' | 'contain';
      showCounter?: boolean;
      showControls?: boolean;
      showDots?: boolean;
    }): void;
  };
}
