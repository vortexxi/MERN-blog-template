import { useState } from "react"

export const useForm = (objetoInicial) => {

    const [formulario, setFormulario] = useState({objetoInicial})

    const serializarFormulario = (formulario) => {

        //new FormData(form), new FormData(form, submitter)
        const formData = new FormData(formulario);

        const objetoCompleto = {}

        //hint: https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
        for(let [name, value] of formData){
            objetoCompleto[name] = value;
        }
        return objetoCompleto;
    };

    const enviado = e => {
        e.preventDefault();

        let curso = serializarFormulario(e.target);
        setFormulario(curso);
        document.querySelector('.form-title').classList.add('green')
    };

    const cambiado = ({target}) => {
        const{name , value} = target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    return{
        formulario,
        enviado,
        cambiado
    }

}