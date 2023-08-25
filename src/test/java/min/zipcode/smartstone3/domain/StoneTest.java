package min.zipcode.smartstone3.domain;

import static org.assertj.core.api.Assertions.assertThat;

import min.zipcode.smartstone3.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StoneTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stone.class);
        Stone stone1 = new Stone();
        stone1.setId(1L);
        Stone stone2 = new Stone();
        stone2.setId(stone1.getId());
        assertThat(stone1).isEqualTo(stone2);
        stone2.setId(2L);
        assertThat(stone1).isNotEqualTo(stone2);
        stone1.setId(null);
        assertThat(stone1).isNotEqualTo(stone2);
    }
}
