import express, { Router, Request, Response} from 'express'
import Expense from '../models/Expense'
import { IExpenseDocument } from '../models/ExpenseInterface'
import auth from '../auth/auth'

const router: Router = express.Router()

router.post('/expenses', auth, async (req: Request, res: Response) => {
    const owner: string = res.locals.user._id
    const expense: IExpenseDocument = new Expense({
        ...req.body,
        owner
    })

    try {
        await expense.save()
        res.status(201).send(expense)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/expenses', auth, async (req: Request, res: Response) => {
    const owner: string = res.locals.user._id
    try {
        const expenses: IExpenseDocument[] = await Expense.find({ owner })
        res.send(expenses)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/expenses/:id', auth, async (req: Request, res: Response) => {
    const { id }: { id : string } = req.params as { id: string }
    const owner: string = res.locals.user._id
    try {
        const expense: IExpenseDocument | null = await Expense.findOne({ owner, _id : id })
        if(!expense) {
            return res.status(404).send()
        }
        res.send(expense)
    } catch(error) {
        res.status(500).send()
    }
})

router.patch('/expenses/:id', auth, async (req: Request, res: Response) => {
    // checking for valid updates
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates: string[] = ['amount','description','title']
    const isAllowed: boolean = updates.every((update: string) => allowedUpdates.includes(update)) 
    
    if(!isAllowed) {
        return res.status(400).send()
    }

    const { id }: { id : string } = req.params as { id: string }
    const owner: string = res.locals.user._id
     
    try {
        const expense: IExpenseDocument | null = await Expense.findOne({ owner, _id: id })
        if(!expense) {
            return res.status(404).send()
        }
        const updatedExpense: IExpenseDocument | null = await Expense.findOneAndUpdate({ owner, _id: id }, req.body , { runValidators: true, new: true })
        res.send(updatedExpense)
    } catch(error) {
        res.status(500).send()
    }
})

router.delete('/expenses/:id', auth, async (req: Request, res: Response) => {
    const { id }: { id : string } = req.params as { id: string }
    const owner: string = res.locals.user._id

    try {
        const expense: IExpenseDocument | null = await Expense.findOneAndDelete({ owner, _id: id})
        if(!expense) {
            return res.status(404).send()
        }

        res.send(expense)
    } catch(error) {
        res.status(500).send()
    }
})

export default router
