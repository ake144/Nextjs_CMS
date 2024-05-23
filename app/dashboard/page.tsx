import { Separator } from "@/components/ui/separator"

export default function Dashboard(){

    return(
        <>  
            <div className="flex flex-col gap-4 p-4 lg:gap-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-3 gap-2">
                    <div className=" p-4 rounded-lg shadow-md">
                        <h1 className="text-xl font-bold">Total Posts</h1>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className=" p-4 rounded-lg shadow-md">
                        <h1 className="text-xl font-bold">Total Media</h1>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className=" p-4 rounded-lg shadow-md">
                        <h1 className="text-xl font-bold">Total Comments</h1>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                </div>
            </div>

        </>
    )
}