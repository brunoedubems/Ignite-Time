import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useState } from "react";
import { HandPalm, Play, Watch } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { NewCyclesForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
activeCycle:Cycle | undefined
activeCycleId: string | null
amountSecondsPassed: number
markCurrentCycleAsFinished: () => void
setSecondsPassed: (seconds: number) => void

}

export const CyclesContext = createContext({} as CyclesContextType);


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
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





export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: " ",
      minutesAmount: 0,
    },
  });

const  {handleSubmit, watch, reset} = newCycleForm

const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

function setSecondsPassed(seconds: number){
  setAmountSecondsPassed(seconds)
}


function markCurrentCycleAsFinished(){
   setCycles(state => state.map((cycle) => {
     if (cycle.id === activeCycleId) {
       return { ...cycle, finishedDate: new Date() };
     } else {
       return cycle;
     }
   }),)
}


  /*função quando submit*/
  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);

    reset();
  }


  function handInterruptCycle() {
    // setCycles(cycles.map((cycle) => {
    setCycles(state => state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;


  return (
    <HomeContainer>
      <form  onSubmit={handleSubmit(handleCreateNewCycle)} action="">
       <CyclesContext.Provider value={{ 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed ,
        setSecondsPassed,
        }}>
        <FormProvider {...newCycleForm}>
          <NewCyclesForm />
        </FormProvider>
          <Countdown />

       </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
