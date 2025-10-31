function Nosotros() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Sobre nosotros</h2>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">¿Quiénes somos?</h3>
          <p>
            En <span className="font-semibold">OptiVision</span>, somos una empresa dedicada a ofrecer las mejores monturas de lentes
            para cada estilo y necesidad. Combinamos diseño, calidad y comodidad para brindar una experiencia visual superior
            a nuestros clientes.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Misión</h3>
          <p>
            Brindar productos ópticos de alta calidad que se adapten al estilo de vida de cada persona, garantizando
            confianza, bienestar visual y satisfacción a nuestros clientes.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Visión</h3>
          <p>
            Ser una empresa líder en el mercado óptico nacional, reconocida por la innovación, la atención personalizada
            y la calidad de nuestros productos.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Valores</h3>
          <ul className="list-disc ml-6">
            <li>Compromiso con la calidad</li>
            <li>Atención personalizada</li>
            <li>Innovación constante</li>
            <li>Transparencia y confianza</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Nosotros
