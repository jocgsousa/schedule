import {
  startOfHour, parseISO, endOfToday, endOfDay, subHours, addHours, format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

// import Appointment from '../models/Appointment';

class AppointmentController {
  async store(request, response) {
    // <==   Pegamos  a data do agora ==>
    const newDate = new Date();
    const agora = subHours(newDate, 3);
    // <==   Pegamos  a data do agora ==>

    // <== Criamos o final deste dia de agora com endOfDay do date-fns ==>
    const endDay = endOfDay(agora);
    const finalDia = subHours(endDay, 4);
    // <== Criamos o final deste dia de agora com endOfDay do date-fns ==>

    // <== Tiramos 10h deste horário para padronizar uma hora de fim de expediente ==>
    const FinalExped = subHours(endDay, 10);
    // <== Tiramos 10h deste horário para padronizar uma hora de fim de expediente ==>

    return response.json({
      nowHour: startOfHour(agora),
      endDay: startOfHour(finalDia),
      endExpediente: startOfHour(FinalExped),
    });
  }
}
export default new AppointmentController();
