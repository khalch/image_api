const ImageManipulationService = {
  apply: (filters, clone) => {
    filters.forEach((item) => {
      clone[item.apply](item.value);
    });
  }
};

module.exports = ImageManipulationService;
