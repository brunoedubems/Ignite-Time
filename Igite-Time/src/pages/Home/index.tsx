import { Play } from "phosphor-react";
import { useForm} from 'react-hook-form';
import{zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  MinutesAmount: zod
  .number()
  .min(5,'O ciclo precisa ser no mínimo de 5 minutos.')
  .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})

export function Home() {
const {register, handleSubmit, watch, formState} = useForm({
  resolver: zodResolver(newCycleFormValidationSchema),
})


function handleCreateNewCycle(data: any){

}

const task = watch('task')
const isSubmitDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
          id="task" 
          placeholder="Dê um nome para seu projeto"
          list="task-suggestions"
          {...register('task')}
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
            {...register('minutesAmount',{valueAsNumber: true})}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
