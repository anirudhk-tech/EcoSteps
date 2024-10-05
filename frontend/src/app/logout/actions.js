'use server'
import { revalidatePath } from "next/cache"
import { createClient } from "../utils/supabase/client"
import { redirect } from "next/navigation"

export async function logout () {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      redirect('/signin')
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }