import { addMenu } from '@/action/action'
import { getAllCategories } from '@/query/query'

async function Page() {
    const categories = await getAllCategories()
    // console.log("categories", categories)
    return (
        <div>
            <div className="card w-1/2 mx-auto bg-base-100 shadow-xl">
                <div className="card-body">
                    <form action={addMenu}>
                        <label className="form-control w-full textarea-info">
                            <div className="label">
                                <span className="label-text">Menu Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Menu name..."
                                className="input input-bordered w-full textarea-info"
                                name='title'
                                required
                            />
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Item Code</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Enter Category name..."
                                className="input input-bordered w-full textarea-info"
                                name='itemCode'
                                required
                            />
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Choose Category</span>
                            </div>
                            <select
                                className="select select-info w-full"
                                name='category'
                                required
                            >
                                <option defaultValue disabled  >--Select Category--</option>
                                {
                                    categories?.map(cat => <option key={cat?._id} value={cat?._id.toString()} >{cat?.categoryName}</option>)
                                }
                            </select>
                            {/* <input
                                type="text"
                                placeholder="Enter Category name..."
                                className="input input-bordered w-full textarea-info"

                            /> */}
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Enter description..."
                                className="input input-bordered w-full textarea-info"
                                name='price'
                                required
                            />
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                className="textarea textarea-info w-full"
                                placeholder="Enter description..."
                                name='description'
                                required></textarea>
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input
                                type="file"
                                name='img'
                                className="file-input file-input-bordered file-input-info w-full"
                                required
                            />
                        </label>
                        <div className='flex justify-center'>
                            <button className='btn btn-primary mt-5 '>Add Menu Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page