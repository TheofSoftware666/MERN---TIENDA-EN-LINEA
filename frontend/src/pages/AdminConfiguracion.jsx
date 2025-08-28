import React, { useState } from 'react';

const AdminConfiguracion = () => {
  const [config, setConfig] = useState({
    nombreTienda: 'Mi Ecommerce',
    correoContacto: 'contacto@mitienda.com',
    telefono: '555-123-4567',
    direccion: 'CDMX, México',
    colorPrimario: '#2563eb',
    logo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig({ ...config, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = () => {
    // Aquí podrías guardar en base de datos o enviar a una API
    console.log('Configuración guardada:', config);
    alert('✅ Configuración actualizada correctamente');
  };

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Configuración del Ecommerce</h2>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-semibold mb-1">Nombre de la Tienda</label>
          <input
            type="text"
            name="nombreTienda"
            value={config.nombreTienda}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Correo de Contacto</label>
          <input
            type="email"
            name="correoContacto"
            value={config.correoContacto}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={config.telefono}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={config.direccion}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Color Primario</label>
          <input
            type="color"
            name="colorPrimario"
            value={config.colorPrimario}
            onChange={handleChange}
            className="w-16 h-10 border rounded-lg p-1"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Logotipo</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
          {config.logo && (
            <div className="mt-2">
              <img
                src={config.logo}
                alt="Logo"
                className="h-16 object-contain rounded border"
              />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleGuardar}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
      >
        Guardar configuración
      </button>
    </section>
  );
};

export default AdminConfiguracion;
