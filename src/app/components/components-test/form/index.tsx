"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaAngleDown } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa conter pelo menos 3 caracteres." })
    .max(60, { message: "O nome pode ter no máximo 60 caracteres" }),
  lastname: z
    .string()
    .min(3, { message: "O sobrenome precisa conter pelo menos 3 caracteres." })
    .max(60, { message: "O nome pode ter no máximo 60 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido por favor." }),
  phone: z.string().min(10, {
    message: "O número de telefone precisa conter pelo menos 10 números.",
  }),
  country: z.string().min(10, { message: "Selecione um país." }),
  streetAdress: z.string().min(10, {
    message: "O endereço precisa conter pelo menos 10 caracteres.",
  }),
  city: z.string().min(3, {
    message: "O nome da cidade precisa conter pelo menos 3 caracteres.",
  }),
  state: z.string().min(3, {
    message: "O nome do estado precisa conter pelo menos 3 caracteres.",
  }),
  cep: z.string().min(8, { message: "Digite um CEP Válido" }).max(8),
});

type formData = z.infer<typeof formSchema>;

export const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields, isSubmitted },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });

  const submitForm = async () => {
    alert("Formulário enviado!");
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  id="first-name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Dan"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-green-500`}
                  {...register("name")}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  id="last-name"
                  type="text"
                  autoComplete="last-name"
                  placeholder="Souza Sampaio"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-green-500`}
                  {...register("lastname")}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-red-600`}
                  {...register("email")}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  id="phone"
                  type="phone"
                  autoComplete="phone"
                  placeholder="Telefone"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-red-600`}
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  autoComplete="country-name"
                  disabled
                  className={`block w-full bg-white px-4 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-green-500`}>
                  <option>Brasil</option>
                  <option>Canada</option>
                  <option>Portugal</option>
                </select>
              </div>
            </div>

            <div className="col-span-3">
              <div className="mt-2">
                <input
                  id="street-address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Endereço"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-red-600`}
                  {...register("streetAdress")}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Ilhéus"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-green-500`}
                  {...register("city")}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  id="state"
                  type="text"
                  autoComplete="address-level1"
                  placeholder="Bahia"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-green-500`}
                  {...register("state")}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <input
                  id="cep"
                  type="text"
                  autoComplete="cep"
                  placeholder="CEP"
                  disabled
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl border-red-600`}
                  {...register("cep")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button disabled className="text-sm rounded-xl py-3 px-5 bg-green-600 text-white">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Form;
