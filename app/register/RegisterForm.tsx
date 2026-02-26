"use client";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import FilterTab from "./FilterTab";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CLIENT",
    city_id: null,
    profession_id: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [professionQuery, setProfessionQuery] = useState("");
  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(false);

  useEffect(() => {
    if(selectedProfession) return;

    if (professionQuery.length < 2) {
      setProfessions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/users/professions/search?q=${professionQuery}`,
        );

        const data = await res.json();
        setProfessions(data);
      } catch (error) {
        console.error("Erro ao buscar profissões:", error);
      }
    }, 200);

    return () => clearTimeout(delay);
  }, [professionQuery, selectedProfession]);

  useEffect(() => {
    if (query.length < 2) {
      setCities([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:8000/cities/search?q=${query}`,
        );

        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao registrar");
        return;
      }

      alert("Registrado com sucesso!");
      window.location.href = "/login";
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar usuário");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-0.5">
      <div>
        <FilterTab
          onChange={(role) => setForm((prev) => ({ ...prev, role }))}
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Nome:</label>
        <input
          type="text"
          placeholder="Insira seu nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      {form.role === "EMPLOYEE" && (
        <div className="relative">
          <label className="text-sm text-gray-600">Profissão:</label>

          <input
            type="text"
            placeholder="Digite sua profissão"
            value={professionQuery}
            onChange={(e) => {
              setProfessionQuery(e.target.value);
              setSelectedProfession(false);

              setForm((prev) => ({
                ...prev,
                profession_id: null,
              }));
            }}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />

          {professions.length > 0 && (
            <ul
              className="
          absolute
          w-full
          bg-white
          border border-gray-300
          rounded-lg
          mt-1
          shadow-lg
          max-h-52
          overflow-y-auto
          z-50
        "
            >
              {professions.map((profession: any) => (
                <li
                  key={profession.id}
                  onClick={() => {
                    setProfessionQuery(profession.name);
                    setProfessions([]);
                    setSelectedProfession(true);

                    setForm({
                      ...form,
                      profession_id: profession.id,
                    });
                  }}
                  className="
              px-3 py-2
              cursor-pointer
              hover:bg-indigo-50
              transition
            "
                >
                  {profession.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <label className="text-sm text-gray-600">Telefone:</label>
        <input
          type="tel"
          placeholder="(81) 99999-9999"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Email:</label>
        <input
          type="email"
          placeholder="nome@usuario.com.br"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="relative">
        <label className="text-sm text-gray-600">Cidade:</label>

        <input
          type="text"
          placeholder="Digite sua cidade"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />

        {/* Dropdown bonito */}
        {cities.length > 0 && (
          <ul
            className="
        absolute
        w-full
        bg-white
        border border-gray-300
        rounded-lg
        mt-1
        shadow-lg
        max-h-52
        overflow-y-auto
        z-50
      "
          >
            {cities.map((city: any) => (
              <li
                key={city.id}
                onClick={() => {
                  setQuery(`${city.name} - ${city.state}`);
                  setCities([]);

                  setForm({
                    ...form,
                    city_id: city.id,
                  });
                }}
                className="
            px-3 py-2
            cursor-pointer
            hover:bg-indigo-50
            transition
          "
              >
                {city.name} - {city.state}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-600">Senha:</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="nome@123"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword(!showPassword)}
            className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-gray-700
                    bg-transparent
                    p-0
                    outline-none
                    focus:outline-none
                    focus-visible:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    active:outline-none
                    active:ring-0
                "
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Confirme sua senha:</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="nome@123"
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-lg font-medium cursor-pointer mt-6"
      >
        Registrar
      </button>
    </form>
  );
}
