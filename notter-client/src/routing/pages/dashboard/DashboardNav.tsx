export const DashboardNav = () => {
    return (
        <nav className="navbar bg-base-100">
            <div className="flex-none">
                <h3 className="text-2xl">Рабочие столы</h3>
                <button className="btn btn-square btn-ghost">

                </button>
            </div>
            <div className="flex-1"/>
            <div className="flex-none">
                <button className="btn btn-circle btn-ghost">
                    <i className="fa-solid fa-ellipsis-vertical"/>
                </button>
            </div>
        </nav>
    )
}