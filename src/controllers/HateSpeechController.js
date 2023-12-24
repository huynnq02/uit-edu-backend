const HateSpeechController = {
  detectHateSpeech: async (req, res) => {
    try {
      const apiUrl = "http://127.0.0.1:8000/api/detect-hate-speech/";

      const requestBody = {
        text: req.body.text,
      };

      const response = await axios.post(apiUrl, requestBody);
      if (response.data.success) {
        const result = response.data.result;
        return res.status(200).json({ success: true, result });
      } else {
        return res
          .status(500)
          .json({ success: false, errors: ["Hate speech detection failed"] });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};

export default HateSpeechController;
