import Note from "../objects/Note"

export default function Notes() {
  return (
    <section className="border-top pt-4">
        <div className="heading-box d-flex justify-content-between ">
            <h3>Notes</h3>
            <button type='button' className='btn-link'>+ New note</button>
        </div>

        <div className="mt-3 notes-box d-flex flex-wrap gap-2 justify-content-evenly">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
    </section>
  )
}
