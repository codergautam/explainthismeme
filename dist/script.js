document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('upload-form');
  const explanationElement = document.getElementById('explanation');
  const resultDiv = document.getElementById('result');
  const memeImage = document.getElementById('meme-image')

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      console.log(...formData)

      const response = await fetch('/explainthismeme', {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const data = await response.json();
          const explanation = data.explanation;

          explanationElement.textContent = explanation;
          resultDiv.style.display = 'block';
      } else {
          console.error('Error:', response.statusText);
      }
  });
});
