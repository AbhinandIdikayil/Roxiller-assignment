import './App.css'
import BarChart from './components/charts/BarChart'
import TransactionStatistics from './components/statisctics/TransactionStatistics'
import TransactionTable from './components/table/transaction/page'

function App() {
  console.log(process.env.SERVER)
  return (
    <>
      <TransactionTable />
      <div className='flex gap-[13px] justify-between'>
        <BarChart />
        <TransactionStatistics />
      </div>
    </>
  )
}

export default App
