import recycle from 'recycle'
import Rx from 'rxjs'
import { configureTimer } from './TimerConfig'
import Intents from './Intents'
import CounterService from './CounterService'
import TimeService from './TimeService'

// This is an integration point; configureTimer, CounterService, Intents, and
// TimeService are all separately testable. This is the module that knits them
// together.

let intents = Intents();
let timerConf = configureTimer(intents.observers,
                               CounterService(intents.observables),
                               TimeService(Rx.Scheduler.async));
export default recycle(timerConf)