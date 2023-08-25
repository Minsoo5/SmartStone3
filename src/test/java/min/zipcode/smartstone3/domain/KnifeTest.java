package min.zipcode.smartstone3.domain;

import static org.assertj.core.api.Assertions.assertThat;

import min.zipcode.smartstone3.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KnifeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Knife.class);
        Knife knife1 = new Knife();
        knife1.setId(1L);
        Knife knife2 = new Knife();
        knife2.setId(knife1.getId());
        assertThat(knife1).isEqualTo(knife2);
        knife2.setId(2L);
        assertThat(knife1).isNotEqualTo(knife2);
        knife1.setId(null);
        assertThat(knife1).isNotEqualTo(knife2);
    }
}
