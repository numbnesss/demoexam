import { useState } from "react"
import { request } from "../api"

export default function ReviewForm({ id, onSaved }) {
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await request(`/applications/${id}/review`, 'POST', { review })
            onSaved()
        } catch (err) {
            setErrors(err.errors || [])
        }

    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} data-testid="req-review" />
            <span className="errField">{errors.review}</span>
            <button type="submit">Оставить отзыв</button>
        </form>
    )
}