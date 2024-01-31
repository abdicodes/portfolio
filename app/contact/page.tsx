'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

const info = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    description: '(+358) 44 920 8411',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    description: 'suldaan.89@hotmail.com',
  },
]
const Contact = () => {
  //form sending boolean to hide form and show success text
  const [formIsSent, setFormIsSent] = useState(false)

  // form state
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  })

  // Handle form field change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, inquiryType: value })
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
      )
      .then(
        () => {
          setFormIsSent(true)
        },
        (err) => {
          console.error('FAILED...', err)
          alert('Failed to send message, please try again.')
        }
      )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="py-6 px-6 mt-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none ">
            <form
              className="flex flex-col gap-6 p-10 bg-[#27272c] 
            rounded-xl "
              onSubmit={handleSubmit}
            >
              <h3 className="text-4xl text-accent ">Let us work together!</h3>
              <p className="text-white/60">
                Tell me more about ways to work with you. Fill in the form below
                or contact me directly using the contact details above.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="firstname"
                  name="firstname"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                <Input
                  type="lastname"
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
                <Input
                  name="phone"
                  type="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="phone"
                />
              </div>
              {/* select */}
              <Select onValueChange={handleSelectChange} name="select">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel> Inquiry type</SelectLabel>

                    <SelectItem value="job">Employment offer</SelectItem>
                    <SelectItem value="freelance"> Freelance work</SelectItem>
                    <SelectItem value="other">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleInputChange}
              />

              {/* Button */}
              <Button size="md" className="max-w-40" type="submit">
                Send message
              </Button>

              {formIsSent && (
                <div>
                  <h3 className="text-4xl text-accent ">
                    Your message has been sent!
                  </h3>
                  <p className="text-white/60">
                    Thank you for your interest. We will get back to you as soon
                    as possible.
                  </p>
                </div>
              )}
            </form>
          </div>
          {/* info */}
          <div
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none
          mb-8 xl:mb-0"
          >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div
                      className="w-[52px] h-[52px] xl:w[72px] xl:h-[72px]
                bg-[#27272c] text-accent rounded-md flex items-center justify-center"
                    >
                      <div className="text-[28px]"> {item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
