import { NextResponse } from 'next/server'

const N8N_WEBHOOK_URL = 'https://vizionnaireai.app.n8n.cloud/webhook-test/a9b964b5-c3cd-42e6-b47a-2952961acc83'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received request body:', body)
    
    // Extraire uniquement les informations nécessaires pour ChatGPT
    let chatGPTContext = ''
    
    if (body.type === 'initialization') {
      // Pour l'initialisation, on prend juste l'humeur et l'intention en français
      chatGPTContext = `État initial de l'utilisateur :
- Humeur : ${body.user_state.mood.label}
- Intention : ${body.user_state.intention.label}`
    } else {
      // Pour les messages normaux, on envoie juste le message
      chatGPTContext = body.message
    }
    
    // Envoyer à n8n avec le contexte simplifié
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://vizionnaire.ai'
      },
      body: JSON.stringify({
        content: chatGPTContext,
        timestamp: body.timestamp
      }),
    })

    console.log('N8N response status:', response.status)
    
    const responseText = await response.text()
    console.log('N8N response text:', responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log('Failed to parse response as JSON:', e)
      data = { response: responseText }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`)
    }

    return NextResponse.json({
      response: data.response || "Message reçu, merci.",
      debug: {
        sentContent: chatGPTContext,
        receivedStatus: response.status,
        receivedBody: data
      }
    })
  } catch (error: any) {
    console.error('Error in webhook route:', error)
    return NextResponse.json(
      { 
        response: "Je suis désolé, j'ai rencontré une difficulté technique. Pouvons-nous réessayer ?",
        error: error.message
      },
      { status: 500 }
    )
  }
} 