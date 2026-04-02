import { useState, useRef, useEffect } from "react";
import { MdSearch, MdClear, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import type { Song } from "../types/song";
import { useToast } from "../context/ToastContext";

const SearchBar = ({ setSearchResult }: { setSearchResult: (results: Song[]) => void }) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const { showToast } = useToast();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClear = () => {
        setValue("");
        setSearchResult([]);
    };
    const search = async (value: string) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/songs/search?q=${encodeURIComponent(value)}`
            );

            const data = await response.json();
            console.log(data);
            setSearchResult(data);
            if (data.length === 0) {
                showToast("No se encontraron canciones", "info");
            }
            return data;
        } catch (error) {
            console.error("Error en búsqueda:", error);
            showToast("Error al buscar canciones", "error");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (value.length === 0) {
            handleClear();
            return;
        }
        if (!value.trim()) return;


        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }


        timeoutRef.current = setTimeout(() => {
            search(value);
        }, 500);


        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            search(value);
        }
    };

    return (
        <div className="flex items-center">

            <span className="rounded-l-lg bg-white/10 p-2  transition-colors">
                {loading ? <ImSpinner8 className="animate-spin" /> : <MdSearch />}
            </span>


            <input
                className="bg-white/10 p-1  hover:bg-white/20 transition-colors outline-none"
                value={value}
                placeholder="Buscar"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />


            {value && (
                <button
                    type="button"
                    className="bg-white/10 p-2 cursor-pointer hover:bg-white/20 transition-colors "
                    onClick={handleClear}
                    aria-label="Limpiar búsqueda"

                >
                    <MdClear />
                </button>
            )}



            <button
                type="button"
                className="bg-[#a855f7] p-2 rounded-r-lg cursor-pointer hover:bg-[#9348da] transition-colors"
                onClick={() => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    search(value);
                }}
                aria-label="Buscar"
            >
                <MdOutlineKeyboardArrowRight />
            </button>
        </div>
    );
};

export default SearchBar;