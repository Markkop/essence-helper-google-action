import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { load, dump } from 'js-yaml'

function createPerkTraniningPhrasesBasedOnAlexaUtterances() {
  const alexaPerkUtterancesPath = resolve(__dirname, './data/alexaPerkUtterances.json')
  const alexaPerkUtterancesJson = readFileSync(alexaPerkUtterancesPath, 'utf8')
  const alexaPerkUtterances = JSON.parse(alexaPerkUtterancesJson)

  const perkTypesPath = resolve(__dirname, '../sdk/custom/types/perk.yaml')
  const perkTypesYaml = readFileSync(perkTypesPath, 'utf8')
  const parkTypes = load(perkTypesYaml)

  const entities = Object.values(parkTypes.synonym.entities) as any
  const synonyms = entities.map((entity: any) => entity.synonyms)
  const trainingPhrases = synonyms.reduce((trainingPhrases: string[], synonyms: string[]) => {
    synonyms.forEach((synonym) => {
      alexaPerkUtterances.forEach((utterance: string) => {
        trainingPhrases.push(utterance.replace('{perk}', `($perk '${synonym.replace('\'s', '')}' auto=false)`))
      })
    })

    return trainingPhrases
  }, [])

  const perkIntentPath = resolve(__dirname, '../sdk/custom/intents/get_equipment_perk.yaml')
  const perkIntentYaml = readFileSync(perkIntentPath, 'utf8')
  const perkIntent = load(perkIntentYaml)

  const newPerkIntent = {
    ...perkIntent,
    trainingPhrases: [...new Set(trainingPhrases)],
  }

  writeFileSync(perkIntentPath, dump(newPerkIntent, {
    lineWidth: -1,
    noArrayIndent: true,
  }))
}

createPerkTraniningPhrasesBasedOnAlexaUtterances()
