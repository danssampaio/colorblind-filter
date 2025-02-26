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
                  placeholder="Nome"
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.name
                      ? "border-red-600"
                      : !errors.name && (dirtyFields.name || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
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
                  placeholder="Sobrenome"
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.lastname
                      ? "border-red-600"
                      : !errors.lastname && (dirtyFields.lastname || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
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
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.email
                      ? "border-red-600"
                      : !errors.email && (dirtyFields.email || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
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
                  placeholder="Confirmação de phone"
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.phone
                      ? "border-red-600"
                      : !errors.phone && (dirtyFields.phone || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border border-gray-500 p-3 rounded-xl"
                >
                  <option>Brasil</option>
                  <option>Canada</option>
                  <option>Portugal</option>
                </select>
                <FaAngleDown
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-3">
              <div className="mt-2">
                <input
                  id="street-address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Endereço"
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.streetAdress
                      ? "border-red-600"
                      : !errors.streetAdress && (dirtyFields.streetAdress || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
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
                  placeholder="Cidade"
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.city
                      ? "border-red-600"
                      : !errors.city && (dirtyFields.city || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
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
                  placeholder="Estado"
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.state
                      ? "border-red-600"
                      : !errors.state && (dirtyFields.state || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
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
                  className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 focus:outline-cyan-600 sm:text-sm/6 border-[3px] p-3 rounded-xl  ${
                    errors.cep
                      ? "border-red-600"
                      : !errors.cep && (dirtyFields.cep || isSubmitted)
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
                  {...register("cep")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="text-sm rounded-xl py-3 px-5 bg-cyan-500 active:bg-cyan-600">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Form;
