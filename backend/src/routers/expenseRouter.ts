import express, { Router, Request, Response} from 'express'
import Expense from '../models/Expense'
import { ExpenseDocument } from '../models/ExpenseInterface'

const router: Router = express.Router()

router.post('/expenses', async (req: Request, res: Response) => {
    const expense: ExpenseDocument = new Expense(req.body)

    try {
        await expense.save()
        res.status(201).send(expense)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/expenses', async (req: Request, res: Response) => {
    try {
        const expenses: ExpenseDocument[] = await Expense.find({})
        res.send(expenses)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/expenses/:id', async (req: Request, res: Response) => {
    const { id }: { id : string } = req.params as { id: string }
    try {
        const expense: ExpenseDocument | null = await Expense.findById(id)
        if(!expense) {
            return res.status(404).send()
        }
        res.send(expense)
    } catch(error) {
        res.status(500).send()
    }
})

router.patch('/expenses/:id', async (req: Request, res: Response) => {
    const { id }: { id : string } = req.params as { id: string }
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates: string[] = ['amount','description','title']
    const isAllowed: boolean = updates.every((update: string) => allowedUpdates.includes(update)) 
    
    if(!isAllowed) {
        return res.status(400).send()
    }
     
    try {
        const expense: ExpenseDocument | null = await Expense.findById(id)
        if(!expense) {
            return res.status(404).send()
        }
        const updatedExpense: ExpenseDocument | null = await Expense.findByIdAndUpdate(id, req.body , { runValidators: true, new: true })
        res.send(updatedExpense)
    } catch(error) {
        res.status(500).send()
    }
})

router.delete('/expenses/:id', async (req: Request, res: Response) => {
    const { id }: { id : string } = req.params as { id: string }

    try {
        const expense: ExpenseDocument | null = await Expense.findByIdAndDelete(id)
        if(!expense) {
            return res.status(404).send()
        }

        res.send(expense)
    } catch(error) {
        res.status(500).send()
    }
})

export default router
