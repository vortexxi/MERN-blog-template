import React, { useState } from 'react'

export const Contacto = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className='articulos'>
      <form className='formulario-contacto' onSubmit={handleSubmit}>
        <label>
          Name
          <input className='name-input' type="text" name="name" placeholder='John Doe' value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email
          <input className='email-input' type="email" name="email" placeholder='doe@mail.com' value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Message
          <textarea className='text-area' name="message" placeholder='bla, bla, bla...' value={formData.message} onChange={handleChange} />
        </label>
        <button className='contact-button' type="submit">Submit</button>
      </form>
    </div>
  )
}
