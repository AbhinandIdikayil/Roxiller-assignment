import './App.css'
import BarChart from './components/charts/BarChart'
import TransactionTable from './components/table/transaction/page'

function App() {
  console.log(process.env.SERVER)
  return (
    <>
      <TransactionTable />
      <BarChart />
    </>
  )
}

export default App
