import axios from "axios";
import { useState } from "react"
import baseUrl from "../contants/baseUrl";
import { useEffect } from "react";
import loadingGIF from '../assets/loading.svg'
import Card from "../components/Card";

export default function Home() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    // pagination
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = handlePagination()

    function handlePagination() {
        const result = []

        for (let i = 1; i <= totalPage; i++) {
            result.push(i)
        }

        return result
    }

    function handlePrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function handleNext() {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    // fetch movies & search
    function handleSearch(e) {
        e.preventDefault()
        fetchMovies()
    }

    async function fetchMovies() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseUrl}/apis/pub/movies/movies?limit=12&q=${search}&page=${currentPage}`)

            setMovies(data.data)
            setTotalPage(data.meta.totalPages)
            setCurrentPage(data.meta.page)
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [currentPage])

    return (
        <>
            {/* Home */}
            <div className="mt-8">
                {/* Search */}
                <form className="max-w-md mx-auto border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" onSubmit={handleSearch}>
                    <div className="relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input className="peer h-full w-full outline-none text-sm text-gray-800 pr-2" type="text" id="search" placeholder="Search something.."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>
                {loading ? (
                    <>
                        {/* Loading */}
                        <div className="flex justify-center w-screen h-screen">
                            <img src={loadingGIF} className="w-1/4" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* home */}
                        <div id="PAGE-HOME" className="min-h-screen flex items-center justify-center">
                            <main className="my-5 bg-white grid grid-cols-6 gap-5">
                                {movies.map((movie, idx) => {
                                    return <Card movie={movie} idx={idx} key={movie.id} fetchMovies={fetchMovies} />
                                })}
                            </main>
                        </div>
                    </>
                )}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-x-1">
                <button type="button" className="min-h-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="{2}" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Prev</span>
                </button>
                <div className="flex items-center gap-x-1">
                    {pagination.map((page) => {
                        return (
                            <button type="button" className={`min-h-[38px]  flex justify-center items-center py-2 px-3 text-sm border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] ${page === currentPage ? "bg-purple-400" : ""}`} onClick={() => setCurrentPage(page)} key={page}>
                                {page}
                            </button>
                        )
                    })}
                </div>
                <button type="button" className="min-h-[38px]  flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handleNext}
                    disabled={currentPage === totalPage}
                >
                    <span>Next</span>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="{2}" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </nav>
        </>
    )
}