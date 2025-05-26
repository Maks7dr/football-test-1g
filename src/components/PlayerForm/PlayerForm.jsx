import React from "react";
import css from "./PlayerForm.module.css";

export default function PlayerForm({ form, onChange, onSubmit, isEditing }) {
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.box}>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Имя"
            className={css.input}
          />
        </div>
        <div className={css.box}>
          <label
            htmlFor="sprint"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            30 м (сек)
          </label>
          <input
            type="number"
            id="sprint"
            name="sprint"
            value={form.sprint}
            onChange={onChange}
            placeholder="30 м (сек)"
            className={css.input}
          />
        </div>
        <div className={css.box}>
          <label
            htmlFor="jump"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Прыжок (см)
          </label>
          <input
            type="number"
            id="jump"
            name="jump"
            value={form.jump}
            onChange={onChange}
            placeholder="Прыжок (см)"
            className={css.input}
          />
        </div>
        <div className={css.box}>
          <label
            htmlFor="juggling"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Набивание (раз)
          </label>
          <input
            type="number"
            id="juggling"
            name="juggling"
            value={form.juggling}
            onChange={onChange}
            placeholder="Набивание (раз)"
            className={css.input}
          />
        </div>
        <div className={css.box}>
          <label
            htmlFor="run50x7"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            7 по 50 (сек)
          </label>
          <input
            type="number"
            id="run50x7"
            name="run50x7"
            value={form.run50x7}
            onChange={onChange}
            placeholder="7 по 50 (сек)"
            className={css.input}
          />
        </div>
        <div className={css.box}>
          <label
            htmlFor="cooper"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Купер (м)
          </label>
          <input
            type="number"
            id="cooper"
            name="cooper"
            value={form.cooper}
            onChange={onChange}
            placeholder="Купер (м)"
            className={css.input}
          />
        </div>
      </div>
      <div className={css.btn}>
        <button className={css.input} onClick={onSubmit}>
          {isEditing ? "Сохранить изменения" : "Добавить игрока"}
        </button>
      </div>
    </>
  );
}
