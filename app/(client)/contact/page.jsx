"use client"
import { Button } from "@/components/ui/button"
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { useState } from "react";
import { contactInfo } from "./contactInfo";
import { Loader2 } from "lucide-react";

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (event) => {
        setLoading(true);
        event.preventDefault();
        // const form = event.currentTarget;
        // const formData = new FormData(event.currentTarget);

        // formData.append("access_key", process.env.NEXT_PUBLIC_CONTACT_KEY);
        console.log(process.env.NEXT_PUBLIC_CONTACT_KEY);
        
        // const object = Object.fromEntries(formData);
        // const json = JSON.stringify(object);

        // const res = await fetch("https://api.web3forms.com/submit", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json"
        //     },
        //     body: json
        // }).then((res) => res.json());

        // if (res.success) {
        //     setSuccess('Your Message Has Been Delivered!');
        //     form.reset();
        //     setLoading(false);
        // } else {
        //     setError("Something Went Wrong! Try Again Later");
        //     setLoading(false);
        // }

    };
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <Header />
                <ContactForm submitForm={submitForm} loading={loading} />
            </div>
            <AlertSuccess
                isOpen={success}
                message={success}
                onClose={() => setSuccess('')}
            />
            <AlertFailure
                isOpen={error}
                message={error}
                onClose={() => setError('')}
            />
        </section>

    )
}

const Header = () => {
    return (
        <>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                {contactInfo.details}
            </p>
        </>
    )
}

const ContactForm = ({ submitForm, loading }) => {
    return (
        <form onSubmit={submitForm} className="space-y-8">
                        <div>
                <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"  name="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Your Name"
                    required disabled={loading}
                />
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="email" name="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="example@example.com"
                    required disabled={loading}
                />
            </div>
            <div>
                <label
                    htmlFor="subject" name="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Let us know how we can help you"
                    required disabled={loading}
                />
            </div>
            <div className="sm:col-span-2">
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                    Your message
                </label>
                <textarea
                    id="message" name="message"
                    rows={6}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Leave a comment..."
                    defaultValue={""} disabled={loading}
                />
            </div>
            <div className="flex">
                {loading ? (
                    <Button className="px-4 py-4" disabled>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button
                        type="submit" className="px-4 py-4"
                    >
                        Send message
                    </Button>
                )}
            </div>
        </form>
    )
}

export default ContactPage