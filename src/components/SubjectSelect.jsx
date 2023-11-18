
export default function SubjectSelect() {
  return (
    <div className='d-flex flex-column'>
        <label className='mb-1' htmlFor="subject-filter">Subject</label>
        <select className='px-2' id="subject-filter">
            <option className='text-subject-1' value="1">Subject 1</option>
            <option className='text-subject-2' value="2">Subject 2</option>
            <option className='text-subject-3' value="3">Subject 3</option>
            <option className='text-subject-4' value="4">Subject 4</option>
            <option className='text-subject-5' value="5">Subject 5</option>
            <option className='text-subject-6' value="6">Subject 6</option>
            <option className='text-subject-7' value="7">Subject 7</option>
            <option className='text-subject-8' value="8">Subject 8</option>
        </select>
    </div>
  )
}
