import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { familiaSchema } from "../schemas/familia";
import { createFamiliaRequest } from "../api/familia";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Card, Button, Input, Label, Message } from "../components/ui";
import { useState } from "react";

function FamiliaFormPage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(familiaSchema),
  });
  const [apiErrors, setApiErrors] = useState([]);

  const onSubmit = async (data) => {
    try {
      const res = await createFamiliaRequest(data);
      setUser(res.data.user);
      navigate("/control");
    } catch (error) {
      console.log("Error al crear la familia:", error.response?.data || error.message);
      setApiErrors(
        Array.isArray(error.response?.data?.message)
          ? error.response.data.message
          : [error.response?.data?.message || "Error al crear la familia"]
      );
    }
  };


  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-4">
      <Card>
        <h1 className="text-3xl font-bold">Crear Familia</h1>
        {apiErrors?.length > 0 &&
          apiErrors.map((err, idx) => <Message key={idx} message={err} />)
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="nombre">Nombre de la Familia:</Label>
          <Input
            type="text"
            id="nombre"
            placeholder="Escriba el nombre de la familia"
            {...register("nombre")}
            autoFocus
          />
          {errors.nombre && (
            <p className="text-red-500">{errors.nombre.message}</p>
          )}
          <Button type="submit">Crear Familia</Button>
        </form>
      </Card>
      <Card>
        <p>¿Quieres unirte a una famila existente?</p>
        <Button onClick={() => navigate("/control")}>Asignar Familia</Button>
      </Card>
    </div>
  );
}

export default FamiliaFormPage;
