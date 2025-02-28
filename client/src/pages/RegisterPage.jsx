//RegisterPage.jsx
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    const success = await signup(value);
    if (success) {
      navigate("/login");
    } else {
      console.log("Registro fallido");
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold">Registrarse</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Usuario:</Label>
          <Input
            type="text"
            id="username"
            autoComplete="username"
            placeholder="Escriba un nombre de Usuario"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="nombre">Nombre:</Label>
          <Input
            type="text"
            id="nombre"
            autoComplete="name"
            placeholder="Escriba su nombre"
            {...register("nombre")}
          />
          {errors.nombre?.message && (
            <p className="text-red-500">{errors.nombre?.message}</p>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Ej:tuemail@domino.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirmar Password:</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button>Enviar</Button>
        </form>
        <p>
          ¿Ya tienes una cuenta?
          <Link className="text-sky-500" to="/login">
            Iniciar Sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;