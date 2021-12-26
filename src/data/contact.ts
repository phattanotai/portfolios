
const contactMenu: { [key: string]: any } = {
    "EN": {
        address: 'Address',
        email: 'Email',
        tel: 'Phone',
    },
    'TH': {
        address: 'ที่อยู่',
        email: 'อีเมล',
        tel: 'เบอร์โทร',
    }
}

const contactLabel: { [key: string]: any } = {
    "EN": {
        name: 'Enter your Name*',
        email: 'Enter your Email* ',
        phone: 'Enter your Phone',
        subject: 'Enter your Subject',
        message: 'Enter your Message*'
    },
    'TH': {
        name: 'กรอกชื่อของคุณ*',
        email: 'กรอกอีเมลของคุณ*',
        phone: 'กรอกเบอร์โทรของคุณ',
        subject: 'กรอกชื่อเรื่องของคุณ',
        message: 'กรอกข้อความของคุณ*'
    }
}

const contactData:{ [key: string]: any } = {
    "EN": {
        address: ['96 Moo.6 Tambon Thanthong, Amphur Phan, Chiang Rai 57250'],
        email: ['zeref38@gmail.com'],
        tel: ['0875683762']
    } ,
    "TH": {
        address: ['เลขที่ 9ที่ 6 หมู่.6 บ้านสันมะแฟน ตำบลธารทอง อำเภอพาน จังหวัดเชียงราย 57250'],
        email: ['zeref38@gmail.com'],
        tel: ['0875683762']
    } 
}

export  {
    contactData,
    contactMenu,
    contactLabel
}