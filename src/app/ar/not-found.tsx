import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import styles from "../not-found.module.css";

export default function ArabicNotFound() {
  return (
    <Section tone="inverse" className={styles.section}>
      <Container width="narrow">
        <div className={styles.wrapper}>
          <span className={styles.code}>خطأ 404 / لم يتم العثور على المسار</span>
          <h1 className={styles.heading}>الصفحة غير متوفرة</h1>
          <p className={styles.lead}>
            المواصفات الفنية أو الصفحة أو المستند المطلوب غير متاح في هذا الرابط. يمكنك العودة للصفحة الرئيسية أو استعراض خدماتنا الهندسية والملاحية.
          </p>
          <div className={styles.actions}>
            <Button href="/ar" variant="primary">
              العودة للرئيسية
            </Button>
            <Button href="/ar/services" variant="secondary">
              استعراض الخدمات
            </Button>
            <Button href="/ar/contact/technical-support" variant="secondary">
              طلب دعم فني
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
