package min.zipcode.smartstone3.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import min.zipcode.smartstone3.IntegrationTest;
import min.zipcode.smartstone3.domain.Stone;
import min.zipcode.smartstone3.repository.StoneRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link StoneResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StoneResourceIT {

    private static final Integer DEFAULT_GRIT_LEVE = 1;
    private static final Integer UPDATED_GRIT_LEVE = 2;

    private static final Integer DEFAULT_SHARPNESS_LIMIT = 1;
    private static final Integer UPDATED_SHARPNESS_LIMIT = 2;

    private static final String ENTITY_API_URL = "/api/stones";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StoneRepository stoneRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStoneMockMvc;

    private Stone stone;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stone createEntity(EntityManager em) {
        Stone stone = new Stone().gritLeve(DEFAULT_GRIT_LEVE).sharpnessLimit(DEFAULT_SHARPNESS_LIMIT);
        return stone;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stone createUpdatedEntity(EntityManager em) {
        Stone stone = new Stone().gritLeve(UPDATED_GRIT_LEVE).sharpnessLimit(UPDATED_SHARPNESS_LIMIT);
        return stone;
    }

    @BeforeEach
    public void initTest() {
        stone = createEntity(em);
    }

    @Test
    @Transactional
    void createStone() throws Exception {
        int databaseSizeBeforeCreate = stoneRepository.findAll().size();
        // Create the Stone
        restStoneMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stone)))
            .andExpect(status().isCreated());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeCreate + 1);
        Stone testStone = stoneList.get(stoneList.size() - 1);
        assertThat(testStone.getGritLeve()).isEqualTo(DEFAULT_GRIT_LEVE);
        assertThat(testStone.getSharpnessLimit()).isEqualTo(DEFAULT_SHARPNESS_LIMIT);
    }

    @Test
    @Transactional
    void createStoneWithExistingId() throws Exception {
        // Create the Stone with an existing ID
        stone.setId(1L);

        int databaseSizeBeforeCreate = stoneRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoneMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stone)))
            .andExpect(status().isBadRequest());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStones() throws Exception {
        // Initialize the database
        stoneRepository.saveAndFlush(stone);

        // Get all the stoneList
        restStoneMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stone.getId().intValue())))
            .andExpect(jsonPath("$.[*].gritLeve").value(hasItem(DEFAULT_GRIT_LEVE)))
            .andExpect(jsonPath("$.[*].sharpnessLimit").value(hasItem(DEFAULT_SHARPNESS_LIMIT)));
    }

    @Test
    @Transactional
    void getStone() throws Exception {
        // Initialize the database
        stoneRepository.saveAndFlush(stone);

        // Get the stone
        restStoneMockMvc
            .perform(get(ENTITY_API_URL_ID, stone.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(stone.getId().intValue()))
            .andExpect(jsonPath("$.gritLeve").value(DEFAULT_GRIT_LEVE))
            .andExpect(jsonPath("$.sharpnessLimit").value(DEFAULT_SHARPNESS_LIMIT));
    }

    @Test
    @Transactional
    void getNonExistingStone() throws Exception {
        // Get the stone
        restStoneMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStone() throws Exception {
        // Initialize the database
        stoneRepository.saveAndFlush(stone);

        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();

        // Update the stone
        Stone updatedStone = stoneRepository.findById(stone.getId()).get();
        // Disconnect from session so that the updates on updatedStone are not directly saved in db
        em.detach(updatedStone);
        updatedStone.gritLeve(UPDATED_GRIT_LEVE).sharpnessLimit(UPDATED_SHARPNESS_LIMIT);

        restStoneMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStone.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStone))
            )
            .andExpect(status().isOk());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
        Stone testStone = stoneList.get(stoneList.size() - 1);
        assertThat(testStone.getGritLeve()).isEqualTo(UPDATED_GRIT_LEVE);
        assertThat(testStone.getSharpnessLimit()).isEqualTo(UPDATED_SHARPNESS_LIMIT);
    }

    @Test
    @Transactional
    void putNonExistingStone() throws Exception {
        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();
        stone.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStoneMockMvc
            .perform(
                put(ENTITY_API_URL_ID, stone.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStone() throws Exception {
        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();
        stone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStoneMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStone() throws Exception {
        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();
        stone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStoneMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stone)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStoneWithPatch() throws Exception {
        // Initialize the database
        stoneRepository.saveAndFlush(stone);

        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();

        // Update the stone using partial update
        Stone partialUpdatedStone = new Stone();
        partialUpdatedStone.setId(stone.getId());

        restStoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStone.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStone))
            )
            .andExpect(status().isOk());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
        Stone testStone = stoneList.get(stoneList.size() - 1);
        assertThat(testStone.getGritLeve()).isEqualTo(DEFAULT_GRIT_LEVE);
        assertThat(testStone.getSharpnessLimit()).isEqualTo(DEFAULT_SHARPNESS_LIMIT);
    }

    @Test
    @Transactional
    void fullUpdateStoneWithPatch() throws Exception {
        // Initialize the database
        stoneRepository.saveAndFlush(stone);

        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();

        // Update the stone using partial update
        Stone partialUpdatedStone = new Stone();
        partialUpdatedStone.setId(stone.getId());

        partialUpdatedStone.gritLeve(UPDATED_GRIT_LEVE).sharpnessLimit(UPDATED_SHARPNESS_LIMIT);

        restStoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStone.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStone))
            )
            .andExpect(status().isOk());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
        Stone testStone = stoneList.get(stoneList.size() - 1);
        assertThat(testStone.getGritLeve()).isEqualTo(UPDATED_GRIT_LEVE);
        assertThat(testStone.getSharpnessLimit()).isEqualTo(UPDATED_SHARPNESS_LIMIT);
    }

    @Test
    @Transactional
    void patchNonExistingStone() throws Exception {
        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();
        stone.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, stone.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStone() throws Exception {
        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();
        stone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStone() throws Exception {
        int databaseSizeBeforeUpdate = stoneRepository.findAll().size();
        stone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStoneMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(stone)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Stone in the database
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStone() throws Exception {
        // Initialize the database
        stoneRepository.saveAndFlush(stone);

        int databaseSizeBeforeDelete = stoneRepository.findAll().size();

        // Delete the stone
        restStoneMockMvc
            .perform(delete(ENTITY_API_URL_ID, stone.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Stone> stoneList = stoneRepository.findAll();
        assertThat(stoneList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
