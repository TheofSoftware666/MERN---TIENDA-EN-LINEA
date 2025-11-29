import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FaqsProduct = ({ producto }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const genericFaqs = [
    {
      Pregunta: "¿Cuál es el tiempo de envío?",
      Respuesta: "El tiempo de envío promedio es de 2 a 5 días hábiles."
    },
    {
      Pregunta: "¿Cuenta con garantía?",
      Respuesta: "Sí, incluye garantía contra defectos de fábrica."
    },
    {
      Pregunta: "¿Aceptan cambios o devoluciones?",
      Respuesta: "Puedes solicitar cambios o devoluciones dentro de los primeros 7 días."
    }
  ];

  const faqsToShow = producto?.Faqs?.length > 0 ? producto.Faqs : genericFaqs;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqsToShow || faqsToShow.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Preguntas Frecuentes
      </h2>

      <div className="space-y-4">
        {faqsToShow.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-lg font-semibold text-gray-900 pr-4">
                {faq.Pregunta}
              </span>
              <ChevronDown
                className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? "max-h-96 opacity-100" 
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6">
                <div className="w-12 h-1 bg-blue-500 rounded-full mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  {faq.Respuesta}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqsProduct;