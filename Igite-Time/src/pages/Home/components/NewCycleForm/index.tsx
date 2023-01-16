import * as zod from "zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
  task: zodResolver.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser no mínimo de 5 minutos.")
    .max(60, "O ciclo precisa ser no máximo de 60 minutos."),
});

// interface NewCycleFormData{
//   task: string;
//   minutesAmount: number;
// }
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;



export function  NewCyclesForm(){

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });


return(
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id="task"
      placeholder="Dê um nome para seu projeto"
      disabled={!!activeCycle}
      list="task-suggestions"
      {...register("task")}
    />

    <datalist id="task-suggestions">
      <option value="Projeto1" />
      <option value="Projeto2" />
      <option value="Projeto3" />
      <option value="teste" />
    </datalist>
    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput
      type="number"
      id="minutesAmount"
      placeholder="00"
      step={0}
      min={0}
      max={60}
      disabled={!!activeCycle}
      {...register("minutesAmount", { valueAsNumber: true })}
    />
    <span>minutos.</span>
  </FormContainer>
)
}