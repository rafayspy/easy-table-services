import { addCategory } from '@/action/action'
import HeadingDashboard from '@/components/typography/HeadingDashboard'
function Page() {
  return (
    <div>
      <HeadingDashboard>Create New Category</HeadingDashboard>
      <section>

        <div className="card w-1/2 mx-auto bg-base-100 shadow-xl">
          <div className="card-body">
            <form action={addCategory}>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Category Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Category name..."
                  className="input input-bordered w-full "
                  name='categoryName'
                  required
                />
              </label>
              <div className='flex justify-center'>
                <button className='btn btn-primary mt-5 '>Add Category</button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Page