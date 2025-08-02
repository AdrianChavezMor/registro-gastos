const passwordInput = document.getElementById('password-input');
const passwordButton = document.getElementById('password-button');

//let myURL = 'http://localhost:3000';
let myURL = 'https://registro-gastos-backend.onrender.com';

passwordButton.addEventListener('click', async () => {

  const result = await checkPassword(passwordInput.value);

  if (result.success){
    localStorage.setItem('access', true)
    setTimeout(() => {
      window.location.href = '../../';
    }, 3000)
  } else {
    alert('Password incorrecta');
    passwordInput.value = '';
  }


}) 

async function checkPassword(typedPassword){
  if(localStorage.getItem('access_token') == null){
      try {
      const response = await fetch(`${myURL}/access`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {

        if (typedPassword === data){
          return { success: true };
        } else{
          return { success: false };
        }

      } else {
        console.error('Error');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error de red:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }
}