export default function Section({ SecTitle, children }) {
    return (
      <section>
        <h2>{SecTitle}</h2>
        {children}
      </section>
    )
  }
  