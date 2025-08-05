import { showfeedback } from "../utils/showFeedback.js";
import { UtilFunctions } from "../../helpers/utilFunctions.js";
import { DateInterval } from "../../core/classes/dateInterval.js";

export class DatePickers {
  static renders(beginDateISO, endDateISO) {
    const beginDate = beginDateISO ?? DateInterval.getTodayAndTomorrowISO().today;
    const tomorrowDate = endDateISO ?? DateInterval.getTodayAndTomorrowISO().tomorrow;
    console.log(beginDate);

    const firstElements = [
      `<input type="checkbox" name="shouldShowHelp" id="shouldShowHelp" style="display: none" />`,
      `<label class="options__background_fade" aria-disabled="true" for="shouldShowHelp"></label>`,
    ];

    const dateForm = `
    <div class="form__dates">
        <label for="dateStart" class="form__label">De:</label> <input type="date" id="dateStart" name="dateStart"
          class="form__input" min="${DateInterval.getTodayAndTomorrowISO().today}" value="${beginDate}" aria-required="true" />
        <label for="dateEnd" class="form__label">Para:</label> <input type="date" id="dateEnd" name="dateEnd"
          class="form__input" min="${beginDate}" value="${tomorrowDate}" aria-required="true" />
    </div>`;

    const element = UtilFunctions.convertStringsToNodeArrays(dateForm);
    const elements = UtilFunctions.convertStringsToNodeArrays(firstElements);

    const section = document.createElement("section");

    section.classList.add("options__help_container");
    section.innerHTML = `<label for="shouldShowHelp" class="help_container__leave" title="Fechar ajuda">&times;</label>
       <h1>Opções</h1>`;
    section.appendChild(element);

    const firstDateInput = section.querySelector("#dateStart");
    const lastDateInput = section.querySelector("#dateEnd");
    DatePickers.addDateInputOnChange(firstDateInput, lastDateInput);

    section.innerHTML += `<button type="submit" style="margin-top: 16px; margin-bottom: 0">Salvar Configurações</button>;`;
    return [...elements, section];
  }

  static addDateInputOnChange(firstDateInput, lastDateInput) {
    firstDateInput.addEventListener("change", (e) => {
      let dateInterval = new DateInterval(firstDateInput.value, lastDateInput.value);
      lastDateInput.value = dateInterval.endISOString;
      lastDateInput.min = dateInterval.beginISOString;
      console.log(dateInterval.isMonthly);
      if (dateInterval.isMonthly) {
        showfeedback("Aluguel Mensal MOVIDA não funcionando.", "warning");
      }
    });

    lastDateInput.addEventListener("change", (e) => {
      let dateInterval = new DateInterval(firstDateInput.value, lastDateInput.value);
      console.log(dateInterval.isMonthly);
      if (dateInterval.isMonthly) {
        showfeedback("Aluguel Mensal MOVIDA não funcionando.", "warning");
      }
    });
  }
}
