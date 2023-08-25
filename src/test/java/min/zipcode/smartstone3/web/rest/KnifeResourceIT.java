package min.zipcode.smartstone3.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import min.zipcode.smartstone3.IntegrationTest;
import min.zipcode.smartstone3.domain.Knife;
import min.zipcode.smartstone3.domain.enumeration.BevelSides;
import min.zipcode.smartstone3.domain.enumeration.CurrentSharpness;
import min.zipcode.smartstone3.domain.enumeration.DesiredOutCome;
import min.zipcode.smartstone3.domain.enumeration.KnifeSize;
import min.zipcode.smartstone3.domain.enumeration.KnifeStyle;
import min.zipcode.smartstone3.domain.enumeration.MetalType;
import min.zipcode.smartstone3.repository.KnifeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link KnifeResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class KnifeResourceIT {

    private static final KnifeStyle DEFAULT_KNIFE_STYLE = KnifeStyle.PAIRING_KNIFE;
    private static final KnifeStyle UPDATED_KNIFE_STYLE = KnifeStyle.PETTY_KNIFE;

    private static final KnifeSize DEFAULT_KNIFE_SIZE = KnifeSize.EIGHTY;
    private static final KnifeSize UPDATED_KNIFE_SIZE = KnifeSize.ONE_HUNDERD_TWENTY;

    private static final MetalType DEFAULT_METAL_TYPE = MetalType.STAINLESS_STEEL;
    private static final MetalType UPDATED_METAL_TYPE = MetalType.HIGH_CARBON;

    private static final BevelSides DEFAULT_BEVEL_SIDES = BevelSides.SINGLE;
    private static final BevelSides UPDATED_BEVEL_SIDES = BevelSides.DOUBLE;

    private static final CurrentSharpness DEFAULT_CURRENT_SHARPNESS_LEVEL = CurrentSharpness.RAZOR_SHARP;
    private static final CurrentSharpness UPDATED_CURRENT_SHARPNESS_LEVEL = CurrentSharpness.SHARP;

    private static final DesiredOutCome DEFAULT_DESIRED_OUTCOME = DesiredOutCome.LASER;
    private static final DesiredOutCome UPDATED_DESIRED_OUTCOME = DesiredOutCome.WORK_HORSE;

    private static final String DEFAULT_STARTING_STONE = "AAAAAAAAAA";
    private static final String UPDATED_STARTING_STONE = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_STONE = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_STONE = "BBBBBBBBBB";

    private static final String DEFAULT_FINISH_STONE = "AAAAAAAAAA";
    private static final String UPDATED_FINISH_STONE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/knives";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KnifeRepository knifeRepository;

    @Mock
    private KnifeRepository knifeRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKnifeMockMvc;

    private Knife knife;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Knife createEntity(EntityManager em) {
        Knife knife = new Knife()
            .knifeStyle(DEFAULT_KNIFE_STYLE)
            .knifeSize(DEFAULT_KNIFE_SIZE)
            .metalType(DEFAULT_METAL_TYPE)
            .bevelSides(DEFAULT_BEVEL_SIDES)
            .currentSharpnessLevel(DEFAULT_CURRENT_SHARPNESS_LEVEL)
            .desiredOutcome(DEFAULT_DESIRED_OUTCOME)
            .startingStone(DEFAULT_STARTING_STONE)
            .middleStone(DEFAULT_MIDDLE_STONE)
            .finishStone(DEFAULT_FINISH_STONE);
        return knife;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Knife createUpdatedEntity(EntityManager em) {
        Knife knife = new Knife()
            .knifeStyle(UPDATED_KNIFE_STYLE)
            .knifeSize(UPDATED_KNIFE_SIZE)
            .metalType(UPDATED_METAL_TYPE)
            .bevelSides(UPDATED_BEVEL_SIDES)
            .currentSharpnessLevel(UPDATED_CURRENT_SHARPNESS_LEVEL)
            .desiredOutcome(UPDATED_DESIRED_OUTCOME)
            .startingStone(UPDATED_STARTING_STONE)
            .middleStone(UPDATED_MIDDLE_STONE)
            .finishStone(UPDATED_FINISH_STONE);
        return knife;
    }

    @BeforeEach
    public void initTest() {
        knife = createEntity(em);
    }

    @Test
    @Transactional
    void createKnife() throws Exception {
        int databaseSizeBeforeCreate = knifeRepository.findAll().size();
        // Create the Knife
        restKnifeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(knife)))
            .andExpect(status().isCreated());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeCreate + 1);
        Knife testKnife = knifeList.get(knifeList.size() - 1);
        assertThat(testKnife.getKnifeStyle()).isEqualTo(DEFAULT_KNIFE_STYLE);
        assertThat(testKnife.getKnifeSize()).isEqualTo(DEFAULT_KNIFE_SIZE);
        assertThat(testKnife.getMetalType()).isEqualTo(DEFAULT_METAL_TYPE);
        assertThat(testKnife.getBevelSides()).isEqualTo(DEFAULT_BEVEL_SIDES);
        assertThat(testKnife.getCurrentSharpnessLevel()).isEqualTo(DEFAULT_CURRENT_SHARPNESS_LEVEL);
        assertThat(testKnife.getDesiredOutcome()).isEqualTo(DEFAULT_DESIRED_OUTCOME);
        assertThat(testKnife.getStartingStone()).isEqualTo(DEFAULT_STARTING_STONE);
        assertThat(testKnife.getMiddleStone()).isEqualTo(DEFAULT_MIDDLE_STONE);
        assertThat(testKnife.getFinishStone()).isEqualTo(DEFAULT_FINISH_STONE);
    }

    @Test
    @Transactional
    void createKnifeWithExistingId() throws Exception {
        // Create the Knife with an existing ID
        knife.setId(1L);

        int databaseSizeBeforeCreate = knifeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKnifeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(knife)))
            .andExpect(status().isBadRequest());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllKnives() throws Exception {
        // Initialize the database
        knifeRepository.saveAndFlush(knife);

        // Get all the knifeList
        restKnifeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(knife.getId().intValue())))
            .andExpect(jsonPath("$.[*].knifeStyle").value(hasItem(DEFAULT_KNIFE_STYLE.toString())))
            .andExpect(jsonPath("$.[*].knifeSize").value(hasItem(DEFAULT_KNIFE_SIZE.toString())))
            .andExpect(jsonPath("$.[*].metalType").value(hasItem(DEFAULT_METAL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].bevelSides").value(hasItem(DEFAULT_BEVEL_SIDES.toString())))
            .andExpect(jsonPath("$.[*].currentSharpnessLevel").value(hasItem(DEFAULT_CURRENT_SHARPNESS_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].desiredOutcome").value(hasItem(DEFAULT_DESIRED_OUTCOME.toString())))
            .andExpect(jsonPath("$.[*].startingStone").value(hasItem(DEFAULT_STARTING_STONE)))
            .andExpect(jsonPath("$.[*].middleStone").value(hasItem(DEFAULT_MIDDLE_STONE)))
            .andExpect(jsonPath("$.[*].finishStone").value(hasItem(DEFAULT_FINISH_STONE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllKnivesWithEagerRelationshipsIsEnabled() throws Exception {
        when(knifeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restKnifeMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(knifeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllKnivesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(knifeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restKnifeMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(knifeRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getKnife() throws Exception {
        // Initialize the database
        knifeRepository.saveAndFlush(knife);

        // Get the knife
        restKnifeMockMvc
            .perform(get(ENTITY_API_URL_ID, knife.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(knife.getId().intValue()))
            .andExpect(jsonPath("$.knifeStyle").value(DEFAULT_KNIFE_STYLE.toString()))
            .andExpect(jsonPath("$.knifeSize").value(DEFAULT_KNIFE_SIZE.toString()))
            .andExpect(jsonPath("$.metalType").value(DEFAULT_METAL_TYPE.toString()))
            .andExpect(jsonPath("$.bevelSides").value(DEFAULT_BEVEL_SIDES.toString()))
            .andExpect(jsonPath("$.currentSharpnessLevel").value(DEFAULT_CURRENT_SHARPNESS_LEVEL.toString()))
            .andExpect(jsonPath("$.desiredOutcome").value(DEFAULT_DESIRED_OUTCOME.toString()))
            .andExpect(jsonPath("$.startingStone").value(DEFAULT_STARTING_STONE))
            .andExpect(jsonPath("$.middleStone").value(DEFAULT_MIDDLE_STONE))
            .andExpect(jsonPath("$.finishStone").value(DEFAULT_FINISH_STONE));
    }

    @Test
    @Transactional
    void getNonExistingKnife() throws Exception {
        // Get the knife
        restKnifeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKnife() throws Exception {
        // Initialize the database
        knifeRepository.saveAndFlush(knife);

        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();

        // Update the knife
        Knife updatedKnife = knifeRepository.findById(knife.getId()).get();
        // Disconnect from session so that the updates on updatedKnife are not directly saved in db
        em.detach(updatedKnife);
        updatedKnife
            .knifeStyle(UPDATED_KNIFE_STYLE)
            .knifeSize(UPDATED_KNIFE_SIZE)
            .metalType(UPDATED_METAL_TYPE)
            .bevelSides(UPDATED_BEVEL_SIDES)
            .currentSharpnessLevel(UPDATED_CURRENT_SHARPNESS_LEVEL)
            .desiredOutcome(UPDATED_DESIRED_OUTCOME)
            .startingStone(UPDATED_STARTING_STONE)
            .middleStone(UPDATED_MIDDLE_STONE)
            .finishStone(UPDATED_FINISH_STONE);

        restKnifeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKnife.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKnife))
            )
            .andExpect(status().isOk());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
        Knife testKnife = knifeList.get(knifeList.size() - 1);
        assertThat(testKnife.getKnifeStyle()).isEqualTo(UPDATED_KNIFE_STYLE);
        assertThat(testKnife.getKnifeSize()).isEqualTo(UPDATED_KNIFE_SIZE);
        assertThat(testKnife.getMetalType()).isEqualTo(UPDATED_METAL_TYPE);
        assertThat(testKnife.getBevelSides()).isEqualTo(UPDATED_BEVEL_SIDES);
        assertThat(testKnife.getCurrentSharpnessLevel()).isEqualTo(UPDATED_CURRENT_SHARPNESS_LEVEL);
        assertThat(testKnife.getDesiredOutcome()).isEqualTo(UPDATED_DESIRED_OUTCOME);
        assertThat(testKnife.getStartingStone()).isEqualTo(UPDATED_STARTING_STONE);
        assertThat(testKnife.getMiddleStone()).isEqualTo(UPDATED_MIDDLE_STONE);
        assertThat(testKnife.getFinishStone()).isEqualTo(UPDATED_FINISH_STONE);
    }

    @Test
    @Transactional
    void putNonExistingKnife() throws Exception {
        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();
        knife.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKnifeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, knife.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(knife))
            )
            .andExpect(status().isBadRequest());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKnife() throws Exception {
        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();
        knife.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnifeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(knife))
            )
            .andExpect(status().isBadRequest());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKnife() throws Exception {
        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();
        knife.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnifeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(knife)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKnifeWithPatch() throws Exception {
        // Initialize the database
        knifeRepository.saveAndFlush(knife);

        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();

        // Update the knife using partial update
        Knife partialUpdatedKnife = new Knife();
        partialUpdatedKnife.setId(knife.getId());

        partialUpdatedKnife
            .knifeSize(UPDATED_KNIFE_SIZE)
            .bevelSides(UPDATED_BEVEL_SIDES)
            .currentSharpnessLevel(UPDATED_CURRENT_SHARPNESS_LEVEL);

        restKnifeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKnife.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKnife))
            )
            .andExpect(status().isOk());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
        Knife testKnife = knifeList.get(knifeList.size() - 1);
        assertThat(testKnife.getKnifeStyle()).isEqualTo(DEFAULT_KNIFE_STYLE);
        assertThat(testKnife.getKnifeSize()).isEqualTo(UPDATED_KNIFE_SIZE);
        assertThat(testKnife.getMetalType()).isEqualTo(DEFAULT_METAL_TYPE);
        assertThat(testKnife.getBevelSides()).isEqualTo(UPDATED_BEVEL_SIDES);
        assertThat(testKnife.getCurrentSharpnessLevel()).isEqualTo(UPDATED_CURRENT_SHARPNESS_LEVEL);
        assertThat(testKnife.getDesiredOutcome()).isEqualTo(DEFAULT_DESIRED_OUTCOME);
        assertThat(testKnife.getStartingStone()).isEqualTo(DEFAULT_STARTING_STONE);
        assertThat(testKnife.getMiddleStone()).isEqualTo(DEFAULT_MIDDLE_STONE);
        assertThat(testKnife.getFinishStone()).isEqualTo(DEFAULT_FINISH_STONE);
    }

    @Test
    @Transactional
    void fullUpdateKnifeWithPatch() throws Exception {
        // Initialize the database
        knifeRepository.saveAndFlush(knife);

        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();

        // Update the knife using partial update
        Knife partialUpdatedKnife = new Knife();
        partialUpdatedKnife.setId(knife.getId());

        partialUpdatedKnife
            .knifeStyle(UPDATED_KNIFE_STYLE)
            .knifeSize(UPDATED_KNIFE_SIZE)
            .metalType(UPDATED_METAL_TYPE)
            .bevelSides(UPDATED_BEVEL_SIDES)
            .currentSharpnessLevel(UPDATED_CURRENT_SHARPNESS_LEVEL)
            .desiredOutcome(UPDATED_DESIRED_OUTCOME)
            .startingStone(UPDATED_STARTING_STONE)
            .middleStone(UPDATED_MIDDLE_STONE)
            .finishStone(UPDATED_FINISH_STONE);

        restKnifeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKnife.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKnife))
            )
            .andExpect(status().isOk());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
        Knife testKnife = knifeList.get(knifeList.size() - 1);
        assertThat(testKnife.getKnifeStyle()).isEqualTo(UPDATED_KNIFE_STYLE);
        assertThat(testKnife.getKnifeSize()).isEqualTo(UPDATED_KNIFE_SIZE);
        assertThat(testKnife.getMetalType()).isEqualTo(UPDATED_METAL_TYPE);
        assertThat(testKnife.getBevelSides()).isEqualTo(UPDATED_BEVEL_SIDES);
        assertThat(testKnife.getCurrentSharpnessLevel()).isEqualTo(UPDATED_CURRENT_SHARPNESS_LEVEL);
        assertThat(testKnife.getDesiredOutcome()).isEqualTo(UPDATED_DESIRED_OUTCOME);
        assertThat(testKnife.getStartingStone()).isEqualTo(UPDATED_STARTING_STONE);
        assertThat(testKnife.getMiddleStone()).isEqualTo(UPDATED_MIDDLE_STONE);
        assertThat(testKnife.getFinishStone()).isEqualTo(UPDATED_FINISH_STONE);
    }

    @Test
    @Transactional
    void patchNonExistingKnife() throws Exception {
        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();
        knife.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKnifeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, knife.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(knife))
            )
            .andExpect(status().isBadRequest());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKnife() throws Exception {
        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();
        knife.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnifeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(knife))
            )
            .andExpect(status().isBadRequest());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKnife() throws Exception {
        int databaseSizeBeforeUpdate = knifeRepository.findAll().size();
        knife.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnifeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(knife)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Knife in the database
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKnife() throws Exception {
        // Initialize the database
        knifeRepository.saveAndFlush(knife);

        int databaseSizeBeforeDelete = knifeRepository.findAll().size();

        // Delete the knife
        restKnifeMockMvc
            .perform(delete(ENTITY_API_URL_ID, knife.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Knife> knifeList = knifeRepository.findAll();
        assertThat(knifeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
