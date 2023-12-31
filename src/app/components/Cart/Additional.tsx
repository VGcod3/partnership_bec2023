'use client'
import Image from "next/image";
import AnimatedElement from "@/hooks/AnimatedElement";

import { useSelector, useDispatch } from 'react-redux';
import { toggleOptionActive } from '@/redux/optionalSlice';
import { toggleModal } from '@/redux/modalSlice'
import { RootState } from '@/redux/store';

import { dataItem, iOptional, ModalParams } from "@/types";

import { capture_it, anonymous_pro_regular } from "../../fonts";

const explanation: dataItem[] = [

    {
        heading: 'Лого на плакатах',
        details: "Плакати про подію будуть розповсюджені на території кампусу та студмістечка."
    },
    {
        heading: 'Логотип на футболках',
        details: "Проєкт буде мати свій мерч, який поширюватиметься серед учасників змагання та осередку BEST Lviv. Ми розмістимо лого Вашої компанії на спині футболок."
    },
    {
        heading: 'Розсилка вакансій в телеграм боті',
        details: "Проєкт буде мати свого бота в телеграмі для реєстрації команд учасників (зможливістью прикріпити своє CV), розсилки важливої інформації та комунікації під час заходу."
    },
]

const Option = ({ name, price, active }: iOptional) => {
    const dispatch = useDispatch();

    const handleToggleOption = () => {
        dispatch(toggleOptionActive({ name }));
    };

    const handleModal = ({ name, modalData }: ModalParams) => dispatch(toggleModal({ name, modalData }))


    return (
        <div onClick={handleToggleOption} className={`flex w-full rounded-full justify-between items-center md:py-4 py-2 px-2 sm:px-4 md:px-8 bg-bec-svg ${active ? 'border-bec-darker border-2' : ''}`}>
            <span className={`lg:text-4xl sm:text-xl text-md`}>{name}</span>
            <div className="right flex gap-2 md:gap-4">
                <button className={`${anonymous_pro_regular.className} text-base sm:text-2xl md:text-4xl bg-bec-bg rounded-2xl border-2 w-fit border-white px-5 md:px-10 py-2 self-center`}>
                    {`${price}$`}
                </button>

                <button onClick={() => handleModal({ name: 'Optional', modalData: explanation })}>
                    <Image src='/information.svg' width={50} height={50} alt="info" className="md:w-12 w-8 md:h-12 min-h-8 hidden sm:block" />
                </button>
            </div>
        </div>
    )
}


export default function Offers() {
    const options = useSelector((state: RootState) => state.optionalPackets);

    return (
        <section className="flex flex-col items-center justify-center px-6 mx-auto max-w-[1400px] gap-8 my-10">
            <h2 className={`${capture_it.className} uppercase text-5xl md:text-7xl mt-16  text-center`}>Додаткові Опції</h2>
            <div className="flex flex-wrap justify-center md:gap-10 gap-5">
                {options.map(option => {
                    return <Option key={option.name} {...option} />
                })}
            </div>
        </section >
    )
}