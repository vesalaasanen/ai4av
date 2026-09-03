---
spec_id: admin/anthem-mrx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Anthem MRX Series (MRX 540/740/1140, AVM 70/90) Control Spec"
manufacturer: Anthem
model_family: "MRX 540"
aliases: []
compatible_with:
  manufacturers:
    - Anthem
  models:
    - "MRX 540"
    - "MRX 740"
    - "MRX 1140"
    - "AVM 70"
    - "AVM 90"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/sandbox1-anthemav/an/MRX-x40-AVM-70-90-IP-RS-232-v5-20251202184749251.xls
retrieved_at: 2026-09-02T16:13:54.117Z
last_checked_at: 2026-09-02T22:16:36.639Z
generated_at: 2026-09-02T22:16:36.639Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility per model is not stated in source"
  - "TCP port is user-configurable 1025-49150 via GCTCPxxxx; no fixed default stated"
  - "source does not define reusable multi-step sequences"
  - "source contains no explicit safety warnings or interlock procedures"
  - "firmware version compatibility per model not stated; no factory-default TCP port stated."
verification:
  verdict: verified
  checked_at: 2026-09-02T22:16:36.639Z
  matched_actions: 399
  action_count: 399
  confidence: medium
  summary: "All 399 spec actions match literally in the source command table; transport values (115200/8/N/1) verified; spec covers the full source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Anthem MRX Series (MRX 540/740/1140, AVM 70/90) Control Spec

## Summary
Control spec for Anthem MRX 540, MRX 740, MRX 1140 AVRs and Anthem AVM 70, AVM 90 AVPs. Devices accept the same serial command set over both RS-232 (DB9, 115200-8-N-1) and TCP/IP (raw ASCII over the configured TCP port). All documented mnemonics, plus standalone DDP device-discovery broadcast, are included.

<!-- UNRESOLVED: firmware compatibility per model is not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port is user-configurable 1025-49150 via GCTCPxxxx; no fixed default stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from ZzPOWy power commands
- routable        # inferred from ZzINPy input select and routing setup commands
- queryable       # inferred from extensive ?-terminated query commands
- levelable       # inferred from ZzVOLsyy / ZzPVOLyy / ZzMUTy / Z1LEVyszz level controls
```

## Actions
```yaml
# --- Host MCU identification / info ---
- id: idq_query
  label: "Query model and firmware version"
  kind: query
  command: "IDQ?"
- id: idm_query
  label: "Query model"
  kind: query
  command: "IDM?"
- id: ids_query
  label: "Query software version"
  kind: query
  command: "IDS?"
- id: dsp_ids_query
  label: "Query DSP software version"
  kind: query
  command: "DSPIDS"
- id: lcd_ids_query
  label: "Query LCDC software version"
  kind: query
  command: "LCDIDS"
- id: gsn_query
  label: "Query serial number"
  kind: query
  command: "GSN"
- id: idr_query
  label: "Query region"
  kind: query
  command: "IDR?"
- id: idb_query
  label: "Query software build date"
  kind: query
  command: "IDB?"
- id: idh_query
  label: "Query hardware version"
  kind: query
  command: "IDH?"

# --- Networking module info ---
- id: nmsver_query
  label: "Networking module software version"
  kind: query
  command: "NMSVER"
- id: nmhver_query
  label: "Networking module hardware version"
  kind: query
  command: "NMHVER"
- id: rver_query
  label: "Networking module release version"
  kind: query
  command: "RVER"
- id: rbd_query
  label: "Networking module release build date"
  kind: query
  command: "RBD"
- id: nmr_query
  label: "Networking module region"
  kind: query
  command: "NMR"
- id: wmac_query
  label: "Wi-Fi MAC address"
  kind: query
  command: "WMAC"
- id: emac_query
  label: "Ethernet MAC address"
  kind: query
  command: "EMAC"
- id: nmst_query
  label: "Network status"
  kind: query
  command: "NMST"

# --- System status (audio/video info) ---
- id: z1vir_query
  label: "Query video input resolution (zone 1)"
  kind: query
  command: "Z1VIR?"
- id: z1irh_query
  label: "Query active horizontal video resolution (zone 1)"
  kind: query
  command: "Z1IRH?"
- id: z1irv_query
  label: "Query active vertical video resolution (zone 1)"
  kind: query
  command: "Z1IRV?"
- id: z1aic_query
  label: "Query audio input channels (zone 1)"
  kind: query
  command: "Z1AIC?"
- id: z1aif_query
  label: "Query audio input format (zone 1)"
  kind: query
  command: "Z1AIF?"
- id: z1brt_query
  label: "Query audio input bit rate (zone 1)"
  kind: query
  command: "Z1BRT?"
- id: z1srt_query
  label: "Query audio input sampling rate (zone 1)"
  kind: query
  command: "Z1SRT?"
- id: z1bdp_query
  label: "Query audio bit depth (zone 1)"
  kind: query
  command: "Z1BDP?"
- id: z1ain_query
  label: "Query current audio input name (zone 1)"
  kind: query
  command: "Z1AIN?"
- id: z1air_query
  label: "Query current audio input rate name (zone 1)"
  kind: query
  command: "Z1AIR?"

# --- Speaker Setup - Amp Matrixing (set / query) ---
- id: ssamf_set
  label: "Set front amplifier matrix destination"
  kind: action
  command: "SSAMFy"
  params:
    - name: y
      type: integer
      description: "MRX 740: 0=Front, 1=Zone 2, 2=Height 1, 3=Height 2. MRX 1140: 0=Front, 1=Zone 2, 2=Front Wide, 3=Height 3."
- id: ssamf_query
  label: "Query front amplifier matrix destination"
  kind: query
  command: "SSAMF?"
- id: ssams_set
  label: "Set surround amplifier matrix destination"
  kind: action
  command: "SSAMSy"
  params:
    - name: y
      type: integer
      description: "MRX 740: 0=Surround, 1=Zone 2, 2=Height 2. MRX 1140: 0=Surround, 1=Zone 2, 2=Height 3."
- id: ssams_query
  label: "Query surround amplifier matrix destination"
  kind: query
  command: "SSAMS?"
- id: ssamb_set
  label: "Set back amplifier matrix destination"
  kind: action
  command: "SSAMBy"
  params:
    - name: y
      type: integer
      description: "MRX 740: 0=Back, 1=Zone 2, 2=Zone 2 On Demand, 3=Height 1, 4=Front Bi-Amp. MRX 1140: 0=Back, 1=Zone 2, 2=Zone 2 On Demand, 3=Front Wide, 4=Front Bi-Amp."
- id: ssamb_query
  label: "Query back amplifier matrix destination"
  kind: query
  command: "SSAMB?"
- id: ssamh1_set
  label: "Set Height 1 amplifier matrix destination (MRX 1140)"
  kind: action
  command: "SSAMH1y"
  params:
    - name: y
      type: integer
      description: "MRX 1140: 0=Height 1, 1=Zone 2, 2=Front Bi-Amp."
- id: ssamh1_query
  label: "Query Height 1 amplifier matrix destination"
  kind: query
  command: "SSAMH1?"
- id: ssamh2_set
  label: "Set Height 2 amplifier matrix destination (MRX 1140)"
  kind: action
  command: "SSAMH2y"
  params:
    - name: y
      type: integer
      description: "MRX 1140: 0=Height 2, 1=Zone 2, 2=Front Wide, 3=Front Bi-Amp."
- id: ssamh2_query
  label: "Query Height 2 amplifier matrix destination"
  kind: query
  command: "SSAMH2?"

# --- Speaker Setup - 3D Sound ---
- id: ss3dhl_set
  label: "Set 3D height layout (MRX 540)"
  kind: action
  command: "SS3DHLy"
  params:
    - name: y
      type: integer
      description: "MRX 540: 0=Height (Atmos), 1=Back (No Atmos)."
- id: ss3dhl_query
  label: "Query 3D height layout"
  kind: query
  command: "SS3DHL?"
- id: ss3dh1_set
  label: "Set Height 1 layout"
  kind: action
  command: "SS3DH1y"
  params:
    - name: y
      type: integer
      description: "0=Front In-Ceiling, 1=Front Dolby, 2=Front On-Wall, 3=Middle In-Ceiling, 4=Middle Dolby, 5=Back In-Ceiling, 6=Back Dolby, 7=Back On-Wall, 8=Off"
- id: ss3dh1_query
  label: "Query Height 1 layout"
  kind: query
  command: "SS3DH1?"
- id: ss3dh2_set
  label: "Set Height 2 layout"
  kind: action
  command: "SS3DH2y"
  params:
    - name: y
      type: integer
      description: "MRX 740/1140, AVM 70/90: 0=Middle In-Ceiling, 1=Middle Dolby, 2=Back In-Ceiling, 3=Back Dolby, 4=Back On-Wall, 5=Off"
- id: ss3dh2_query
  label: "Query Height 2 layout"
  kind: query
  command: "SS3DH2?"
- id: ss3dh3_set
  label: "Set Height 3 layout"
  kind: action
  command: "SS3DH3y"
  params:
    - name: y
      type: integer
      description: "MRX 1140, AVM 70/90: 0=Back In-Ceiling, 1=Back Dolby, 2=Back On-Wall, 3=Off"
- id: ss3dh3_query
  label: "Query Height 3 layout"
  kind: query
  command: "SS3DH3?"

# --- Speaker profile - Speaker Setup (p = 1..4) ---
- id: ssspp0_set
  label: "Set speaker profile name"
  kind: action
  command: "SSSPp0yyy"
  params:
    - name: p
      type: integer
      description: "Profile number 1-4"
    - name: yyy
      type: string
      description: "16-character profile name"
- id: ssspp0_query
  label: "Query speaker profile name"
  kind: query
  command: "SSSPp0?"
- id: ssspp1_set
  label: "Set subwoofer count in speaker profile"
  kind: action
  command: "SSSPp1y"
  params:
    - name: p
      type: integer
      description: "Profile number 1-4"
    - name: y
      type: integer
      description: "MRX 540/740: 0=Off, 1=On. MRX 1140/AVM 70: 0=None, 1-2. AVM 90: 0=None, 1-4"
- id: ssspp1_query
  label: "Query subwoofer count in speaker profile"
  kind: query
  command: "SSSPp1?"
- id: ssspp5_query
  label: "Query front speaker presence (read-only)"
  kind: query
  command: "SSSPp5?"
- id: ssspp6_set
  label: "Set front wide presence in speaker profile"
  kind: action
  command: "SSSPp6y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "MRX 1140, AVM 70/90: 0=Off, 1=On"
- id: ssspp6_query
  label: "Query front wide presence"
  kind: query
  command: "SSSPp6?"
- id: ssspp7_set
  label: "Set center presence in speaker profile"
  kind: action
  command: "SSSPp7y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: ssspp7_query
  label: "Query center presence"
  kind: query
  command: "SSSPp7?"
- id: ssspp8_set
  label: "Set surround presence in speaker profile"
  kind: action
  command: "SSSPp8y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: ssspp8_query
  label: "Query surround presence"
  kind: query
  command: "SSSPp8?"
- id: ssspp9_set
  label: "Set back presence in speaker profile"
  kind: action
  command: "SSSPp9y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: ssspp9_query
  label: "Query back presence"
  kind: query
  command: "SSSPp9?"
- id: sssppa_set
  label: "Set Height 1 presence in speaker profile"
  kind: action
  command: "SSSPpAy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: sssppa_query
  label: "Query Height 1 presence"
  kind: query
  command: "SSSPpA?"
- id: sssppb_set
  label: "Set Height 2 presence in speaker profile (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "SSSPpBy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: sssppb_query
  label: "Query Height 2 presence"
  kind: query
  command: "SSSPpB?"
- id: sssppc_set
  label: "Set Height 3 presence in speaker profile (MRX 1140, AVM 70/90)"
  kind: action
  command: "SSSPpCy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: sssppc_query
  label: "Query Height 3 presence"
  kind: query
  command: "SSSPpC?"

# --- Bass Management (p = 1..4) ---
- id: bmspp0_set
  label: "Set LFE low pass filter"
  kind: action
  command: "BMSPp0y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "40-120 Hz step 10; 130 = Bypass"
- id: bmspp0_query
  label: "Query LFE low pass filter"
  kind: query
  command: "BMSPp0?"
- id: bmspp10_set
  label: "Set Subwoofer 1 phase frequency"
  kind: action
  command: "BMSPp10y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "40-120 Hz"
- id: bmspp10_query
  label: "Query Subwoofer 1 phase frequency"
  kind: query
  command: "BMSPp10?"
- id: bmspp11_set
  label: "Set Subwoofer 1 phase"
  kind: action
  command: "BMSPp11y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0-180 degrees, step 1"
- id: bmspp11_query
  label: "Query Subwoofer 1 phase"
  kind: query
  command: "BMSPp11?"
- id: bmspp12_set
  label: "Set Subwoofer 1 polarity"
  kind: action
  command: "BMSPp12y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Normal, 1=Inverted"
- id: bmspp12_query
  label: "Query Subwoofer 1 polarity"
  kind: query
  command: "BMSPp12?"
- id: bmspp20_set
  label: "Set Subwoofer 2 phase frequency (MRX 1140, AVM 70/90)"
  kind: action
  command: "BMSPp20y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "40-120 Hz"
- id: bmspp20_query
  label: "Query Subwoofer 2 phase frequency"
  kind: query
  command: "BMSPp20?"
- id: bmspp21_set
  label: "Set Subwoofer 2 phase (MRX 1140, AVM 70/90)"
  kind: action
  command: "BMSPp21y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0-180 degrees, step 1"
- id: bmspp21_query
  label: "Query Subwoofer 2 phase"
  kind: query
  command: "BMSPp21?"
- id: bmspp22_set
  label: "Set Subwoofer 2 polarity (MRX 1140, AVM 70/90)"
  kind: action
  command: "BMSPp22y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Normal, 1=Inverted"
- id: bmspp22_query
  label: "Query Subwoofer 2 polarity"
  kind: query
  command: "BMSPp22?"
- id: bmspp30_set
  label: "Set Subwoofer 3 phase frequency (AVM 90)"
  kind: action
  command: "BMSPp30y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "40-120 Hz"
- id: bmspp30_query
  label: "Query Subwoofer 3 phase frequency"
  kind: query
  command: "BMSPp30?"
- id: bmspp31_set
  label: "Set Subwoofer 3 phase (AVM 90)"
  kind: action
  command: "BMSPp31y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0-180 degrees, step 1"
- id: bmspp31_query
  label: "Query Subwoofer 3 phase"
  kind: query
  command: "BMSPp31?"
- id: bmspp32_set
  label: "Set Subwoofer 3 polarity (AVM 90)"
  kind: action
  command: "BMSPp32y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Normal, 1=Inverted"
- id: bmspp32_query
  label: "Query Subwoofer 3 polarity"
  kind: query
  command: "BMSPp32?"
- id: bmspp40_set
  label: "Set Subwoofer 4 phase frequency (AVM 90)"
  kind: action
  command: "BMSPp40y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "40-120 Hz"
- id: bmspp40_query
  label: "Query Subwoofer 4 phase frequency"
  kind: query
  command: "BMSPp40?"
- id: bmspp41_set
  label: "Set Subwoofer 4 phase (AVM 90)"
  kind: action
  command: "BMSPp41y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0-180 degrees, step 1"
- id: bmspp41_query
  label: "Query Subwoofer 4 phase"
  kind: query
  command: "BMSPp41?"
- id: bmspp42_set
  label: "Set Subwoofer 4 polarity (AVM 90)"
  kind: action
  command: "BMSPp42y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Normal, 1=Inverted"
- id: bmspp42_query
  label: "Query Subwoofer 4 polarity"
  kind: query
  command: "BMSPp42?"
- id: bmspp5_set
  label: "Set front crossover"
  kind: action
  command: "BMSPp5y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmspp5_query
  label: "Query front crossover"
  kind: query
  command: "BMSPp5?"
- id: bmspp6_set
  label: "Set front wide crossover (MRX 1140, AVM 70/90)"
  kind: action
  command: "BMSPp6y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmspp6_query
  label: "Query front wide crossover"
  kind: query
  command: "BMSPp6?"
- id: bmspp7_set
  label: "Set center crossover"
  kind: action
  command: "BMSPp7y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmspp7_query
  label: "Query center crossover"
  kind: query
  command: "BMSPp7?"
- id: bmspp8_set
  label: "Set surround crossover"
  kind: action
  command: "BMSPp8y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmspp8_query
  label: "Query surround crossover"
  kind: query
  command: "BMSPp8?"
- id: bmspp9_set
  label: "Set back crossover"
  kind: action
  command: "BMSPp9y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmspp9_query
  label: "Query back crossover"
  kind: query
  command: "BMSPp9?"
- id: bmsppa_set
  label: "Set Height 1 crossover"
  kind: action
  command: "BMSPpAy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmsppa_query
  label: "Query Height 1 crossover"
  kind: query
  command: "BMSPpA?"
- id: bmsppb_set
  label: "Set Height 2 crossover (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "BMSPpBy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmsppb_query
  label: "Query Height 2 crossover"
  kind: query
  command: "BMSPpB?"
- id: bmsppc_set
  label: "Set Height 3 crossover (MRX 1140, AVM 70/90)"
  kind: action
  command: "BMSPpCy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "30=Off, 40-250 Hz step 10"
- id: bmsppc_query
  label: "Query Height 3 crossover"
  kind: query
  command: "BMSPpC?"
- id: bmsppd_set
  label: "Set Super Sub Fronts"
  kind: action
  command: "BMSPpDy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=No, 1=Yes"
- id: bmsppd_query
  label: "Query Super Sub Fronts"
  kind: query
  command: "BMSPpD?"

# --- Listener Position (p = 1..4) ---
- id: lpspp1_set
  label: "Set Subwoofer (1) distance"
  kind: action
  command: "LPSPp1y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0-180; Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp1_query
  label: "Query Subwoofer (1) distance"
  kind: query
  command: "LPSPp1?"
- id: lpspp2_set
  label: "Set Subwoofer 2 distance (MRX 1140, AVM 70/90)"
  kind: action
  command: "LPSPp2y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp2_query
  label: "Query Subwoofer 2 distance"
  kind: query
  command: "LPSPp2?"
- id: lpspp3_set
  label: "Set Subwoofer 3 distance (AVM 90)"
  kind: action
  command: "LPSPp3y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp3_query
  label: "Query Subwoofer 3 distance"
  kind: query
  command: "LPSPp3?"
- id: lpspp4_set
  label: "Set Subwoofer 4 distance (AVM 90)"
  kind: action
  command: "LPSPp4y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp4_query
  label: "Query Subwoofer 4 distance"
  kind: query
  command: "LPSPp4?"
- id: lpspp5_set
  label: "Set front left distance"
  kind: action
  command: "LPSPp5y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp5_query
  label: "Query front left distance"
  kind: query
  command: "LPSPp5?"
- id: lpspp6_set
  label: "Set front right distance"
  kind: action
  command: "LPSPp6y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp6_query
  label: "Query front right distance"
  kind: query
  command: "LPSPp6?"
- id: lpspp7_set
  label: "Set front wide left distance (MRX 1140, AVM 70/90)"
  kind: action
  command: "LPSPp7y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp7_query
  label: "Query front wide left distance"
  kind: query
  command: "LPSPp7?"
- id: lpspp8_set
  label: "Set front wide right distance (MRX 1140, AVM 70/90)"
  kind: action
  command: "LPSPp8y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp8_query
  label: "Query front wide right distance"
  kind: query
  command: "LPSPp8?"
- id: lpspp9_set
  label: "Set center distance"
  kind: action
  command: "LPSPp9y"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspp9_query
  label: "Query center distance"
  kind: query
  command: "LPSPp9?"
- id: lpsppa_set
  label: "Set surround left distance"
  kind: action
  command: "LPSPpAy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppa_query
  label: "Query surround left distance"
  kind: query
  command: "LPSPpA?"
- id: lpsppb_set
  label: "Set surround right distance"
  kind: action
  command: "LPSPpBy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppb_query
  label: "Query surround right distance"
  kind: query
  command: "LPSPpB?"
- id: lpsppc_set
  label: "Set back left distance"
  kind: action
  command: "LPSPpCy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppc_query
  label: "Query back left distance"
  kind: query
  command: "LPSPpC?"
- id: lpsppd_set
  label: "Set back right distance"
  kind: action
  command: "LPSPpDy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppd_query
  label: "Query back right distance"
  kind: query
  command: "LPSPpD?"
- id: lpsppe_set
  label: "Set Height 1 left distance"
  kind: action
  command: "LPSPpEy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppe_query
  label: "Query Height 1 left distance"
  kind: query
  command: "LPSPpE?"
- id: lpsppf_set
  label: "Set Height 1 right distance"
  kind: action
  command: "LPSPpFy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppf_query
  label: "Query Height 1 right distance"
  kind: query
  command: "LPSPpF?"
- id: lpsppg_set
  label: "Set Height 2 left distance (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "LPSPpGy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppg_query
  label: "Query Height 2 left distance"
  kind: query
  command: "LPSPpG?"
- id: lpspph_set
  label: "Set Height 2 right distance (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "LPSPpHy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpspph_query
  label: "Query Height 2 right distance"
  kind: query
  command: "LPSPpH?"
- id: lpsppi_set
  label: "Set Height 3 left distance (MRX 1140, AVM 70/90)"
  kind: action
  command: "LPSPpIy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppi_query
  label: "Query Height 3 left distance"
  kind: query
  command: "LPSPpI?"
- id: lpsppj_set
  label: "Set Height 3 right distance (MRX 1140, AVM 70/90)"
  kind: action
  command: "LPSPpJy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "Feet 0'0\"-30'0\" step 2\" or Metric 0-900 cm step 5 cm"
- id: lpsppj_query
  label: "Query Height 3 right distance"
  kind: query
  command: "LPSPpJ?"

# --- Level Calibration (p = 1..4) ---
- id: lcspp0_set
  label: "Set calibration level"
  kind: action
  command: "LCSPp0y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp0_query
  label: "Query calibration level"
  kind: query
  command: "LCSPp0?"
- id: lcspp1_set
  label: "Set Subwoofer (1) trim"
  kind: action
  command: "LCSPp1y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp1_query
  label: "Query Subwoofer (1) trim"
  kind: query
  command: "LCSPp1?"
- id: lcspp2_set
  label: "Set Subwoofer 2 trim (MRX 1140, AVM 70/90)"
  kind: action
  command: "LCSPp2y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp2_query
  label: "Query Subwoofer 2 trim"
  kind: query
  command: "LCSPp2?"
- id: lcspp3_set
  label: "Set Subwoofer 3 trim (AVM 90)"
  kind: action
  command: "LCSPp3y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp3_query
  label: "Query Subwoofer 3 trim"
  kind: query
  command: "LCSPp3?"
- id: lcspp4_set
  label: "Set Subwoofer 4 trim (AVM 90)"
  kind: action
  command: "LCSPp4y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp4_query
  label: "Query Subwoofer 4 trim"
  kind: query
  command: "LCSPp4?"
- id: lcspp5_set
  label: "Set front left trim"
  kind: action
  command: "LCSPp5y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp5_query
  label: "Query front left trim"
  kind: query
  command: "LCSPp5?"
- id: lcspp6_set
  label: "Set front right trim"
  kind: action
  command: "LCSPp6y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp6_query
  label: "Query front right trim"
  kind: query
  command: "LCSPp6?"
- id: lcspp7_set
  label: "Set front wide left trim (MRX 1140, AVM 70/90)"
  kind: action
  command: "LCSPp7y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp7_query
  label: "Query front wide left trim"
  kind: query
  command: "LCSPp7?"
- id: lcspp8_set
  label: "Set front wide right trim (MRX 1140, AVM 70/90)"
  kind: action
  command: "LCSPp8y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp8_query
  label: "Query front wide right trim"
  kind: query
  command: "LCSPp8?"
- id: lcspp9_set
  label: "Set center trim"
  kind: action
  command: "LCSPp9y"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspp9_query
  label: "Query center trim"
  kind: query
  command: "LCSPp9?"
- id: lcsppa_set
  label: "Set surround left trim"
  kind: action
  command: "LCSPpAy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppa_query
  label: "Query surround left trim"
  kind: query
  command: "LCSPpA?"
- id: lcsppb_set
  label: "Set surround right trim"
  kind: action
  command: "LCSPpBy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppb_query
  label: "Query surround right trim"
  kind: query
  command: "LCSPpB?"
- id: lcsppc_set
  label: "Set back left trim"
  kind: action
  command: "LCSPpCy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppc_query
  label: "Query back left trim"
  kind: query
  command: "LCSPpC?"
- id: lcsppd_set
  label: "Set back right trim"
  kind: action
  command: "LCSPpDy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppd_query
  label: "Query back right trim"
  kind: query
  command: "LCSPpD?"
- id: lcsppe_set
  label: "Set Height 1 left trim"
  kind: action
  command: "LCSPpEy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppe_query
  label: "Query Height 1 left trim"
  kind: query
  command: "LCSPpE?"
- id: lcsppf_set
  label: "Set Height 1 right trim"
  kind: action
  command: "LCSPpFy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppf_query
  label: "Query Height 1 right trim"
  kind: query
  command: "LCSPpF?"
- id: lcsppg_set
  label: "Set Height 2 left trim (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "LCSPpGy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppg_query
  label: "Query Height 2 left trim"
  kind: query
  command: "LCSPpG?"
- id: lcspph_set
  label: "Set Height 2 right trim (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "LCSPpHy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcspph_query
  label: "Query Height 2 right trim"
  kind: query
  command: "LCSPpH?"
- id: lcsppi_set
  label: "Set Height 3 left trim (MRX 1140, AVM 70/90)"
  kind: action
  command: "LCSPpIy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppi_query
  label: "Query Height 3 left trim"
  kind: query
  command: "LCSPpI?"
- id: lcsppj_set
  label: "Set Height 3 right trim (MRX 1140, AVM 70/90)"
  kind: action
  command: "LCSPpJy"
  params:
    - name: p
      type: integer
    - name: y
      type: number
      description: "-15 to +15 dB, step 0.5 dB"
- id: lcsppj_query
  label: "Query Height 3 right trim"
  kind: query
  command: "LCSPpJ?"
- id: lcsppk_set
  label: "Set test noise on/off"
  kind: action
  command: "LCSPpKy"
  params:
    - name: p
      type: integer
    - name: y
      type: integer
      description: "0=Off, 1=On. Only one profile can have Test Noise active."
- id: lcsppk_query
  label: "Query test noise state"
  kind: query
  command: "LCSPpK?"

# --- Input Setup (i = 1..ZZ) ---
- id: icn_query
  label: "Query number of active input configurations"
  kind: query
  command: "ICN?"
- id: iiai_set
  label: "Insert input number"
  kind: action
  command: "IIAIi"
  params:
    - name: i
      type: integer
      description: "Input number 1-ZZ (max 30)"
- id: idai_set
  label: "Delete input number"
  kind: action
  command: "IDAIi"
  params:
    - name: i
      type: integer
      description: "Input number 1-ZZ"
- id: isiin_set
  label: "Set input name"
  kind: action
  command: "ISiINyyyy"
  params:
    - name: i
      type: integer
    - name: yyyy
      type: string
      description: "16 characters"
- id: isiin_query
  label: "Query input name"
  kind: query
  command: "ISiIN?"
- id: isivid_set
  label: "Set video input jack"
  kind: action
  command: "ISiVIDx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=None, 1-7=HDMI 1-7"
- id: isivid_query
  label: "Query video input jack"
  kind: query
  command: "ISiVID?"
- id: isiaij_set
  label: "Set audio input jack"
  kind: action
  command: "ISiAIJx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "MRX 540/740/1140: 0=None, 1=HDMI, 2=HDMI eARC, 3-4=Digital Coax 1-2, 5-7=Digital Optical 1-3, 8-12=Analog 1-5, 13=Streaming, 14=Bluetooth. AVM 70/90: 0=None, 1=HDMI, 2=HDMI ARC, 3-4=Digital Coax 1-2, 5-7=Digital Optical 1-3, 8-11=Analog 1-4, 12=Phono MM, 13=Streaming, 14=Bluetooth"
- id: isiaij_query
  label: "Query audio input jack"
  kind: query
  command: "ISiAIJ?"
- id: isica_set
  label: "Set Convert Analog mode"
  kind: action
  command: "ISiCAx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "MRX 540/740/1140: 0=No, 1=32/96 kHz. AVM 70/90: 0=No, 1=48/96/192 kHz"
- id: isica_query
  label: "Query Convert Analog mode"
  kind: query
  command: "ISiCA?"
- id: isisp_set
  label: "Assign speaker profile to input"
  kind: action
  command: "ISiSPp"
  params:
    - name: i
      type: integer
    - name: p
      type: integer
      description: "Profile 1-4"
- id: isisp_query
  label: "Query speaker profile for input"
  kind: query
  command: "ISiSP?"
- id: isiarc_set
  label: "Set Anthem Room Correction on/off for input"
  kind: action
  command: "ISiARCx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=Off, 1=On. ARC must have been performed."
- id: isiarc_query
  label: "Query ARC state for input"
  kind: query
  command: "ISiARC?"
- id: isirf_set
  label: "Set rumble filter on/off for input (AVM 70/90)"
  kind: action
  command: "ISiRFx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=Off, 1=On"
- id: isirf_query
  label: "Query rumble filter for input"
  kind: query
  command: "ISiRF?"
- id: isidv_set
  label: "Set Dolby Audio Post-Processing mode"
  kind: action
  command: "ISiDVx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=Off, 1=Movie, 2=Music, 3=Night"
- id: isidv_query
  label: "Query Dolby Audio Post-Processing mode"
  kind: query
  command: "ISiDV?"
- id: isipm_set
  label: "Set mode preset for mono source"
  kind: action
  command: "ISiPMx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=Mono, 1=Last Used, 2=All Channel Mono"
- id: isipm_query
  label: "Query mode preset for mono source"
  kind: query
  command: "ISiPM?"
- id: isips_set
  label: "Set mode preset for stereo source"
  kind: action
  command: "ISiPSx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=None, 1=Last Used, 2=AnthemLogic-Cinema, 3=AnthemLogic-Music, 4=Dolby Surround, 5=DTS Neural:X, 6=DTS Virtual:X, 7=All Channel Stereo, 8=Mono, 9=All Channel Mono"
- id: isips_query
  label: "Query mode preset for stereo source"
  kind: query
  command: "ISiPS?"
- id: isipc_set
  label: "Set mode preset for multi-channel source"
  kind: action
  command: "ISiPCx"
  params:
    - name: i
      type: integer
    - name: x
      type: integer
      description: "0=None, 1=Last Used, 2=Dolby Surround, 3=DTS Neural:X, 4=DTS Virtual:X, 5=All Channel Stereo, 6=Mono, 7=All Channel Mono"
- id: isipc_query
  label: "Query mode preset for multi-channel source"
  kind: query
  command: "ISiPC?"
- id: isils_set
  label: "Set lip sync for input (ms)"
  kind: action
  command: "ISiLSxxx"
  params:
    - name: i
      type: integer
    - name: xxx
      type: integer
      description: "0-150 in steps of 5 ms"
- id: isils_query
  label: "Query lip sync for input"
  kind: query
  command: "ISiLS?"
- id: isiit_set
  label: "Set input trim"
  kind: action
  command: "ISiITx"
  params:
    - name: i
      type: integer
    - name: x
      type: number
      description: "-12 to +12 dB, step 0.5 dB"
- id: isiit_query
  label: "Query input trim"
  kind: query
  command: "ISiIT?"

# --- General Config - Preferences ---
- id: gcl_set
  label: "Set language"
  kind: action
  command: "GCLx"
  params:
    - name: x
      type: integer
      description: "0=English, 1=Chinese, 2=German, 3=Spanish, 4=French, 5=Italian"
- id: gcl_query
  label: "Query language"
  kind: query
  command: "GCL?"
- id: gctz_set
  label: "Set time zone"
  kind: action
  command: "GCTZccc"
  params:
    - name: ccc
      type: string
      description: "-12.00 to +14.00"
- id: gctz_query
  label: "Query time zone"
  kind: query
  command: "GCTZ?"
- id: gcbu_set
  label: "Set beta updates allowed"
  kind: action
  command: "GCBUx"
  params:
    - name: x
      type: integer
      description: "0=No, 1=Yes"
- id: gcbu_query
  label: "Query beta updates"
  kind: query
  command: "GCBU?"
- id: gcdu_set
  label: "Set distance units"
  kind: action
  command: "GCDUx"
  params:
    - name: x
      type: integer
      description: "0=Feet, 1=Metres"
- id: gcdu_query
  label: "Query distance units"
  kind: query
  command: "GCDU?"
- id: gcfpb_set
  label: "Set front panel brightness (%)"
  kind: action
  command: "GCFPBx"
  params:
    - name: x
      type: integer
      description: "0-100, default 30"
- id: gcfpb_query
  label: "Query front panel brightness"
  kind: query
  command: "GCFPB?"
- id: gccwub_set
  label: "Set wake-up brightness (%)"
  kind: action
  command: "GCCWUBx"
  params:
    - name: x
      type: integer
      description: "Front panel brightness to 100"
- id: gccwub_query
  label: "Query wake-up brightness"
  kind: query
  command: "GCCWUB?"
- id: gcosid_set
  label: "Set on-screen display info aspect"
  kind: action
  command: "GCOSIDx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=16:9, 2=2.4:1"
- id: gcosid_query
  label: "Query on-screen display info aspect"
  kind: query
  command: "GCOSID?"
- id: gcfpdi_set
  label: "Set front panel display info mode"
  kind: action
  command: "GCFPDIx"
  params:
    - name: x
      type: integer
      description: "0=All, 1=Volume only"
- id: gcfpdi_query
  label: "Query front panel display info mode"
  kind: query
  command: "GCFPDI?"
- id: gcmvs_set
  label: "Set master volume scale"
  kind: action
  command: "GCMVSx"
  params:
    - name: x
      type: integer
      description: "0=Percent, 1=dB"
- id: gcmvs_query
  label: "Query master volume scale"
  kind: query
  command: "GCMVS?"
- id: gcml_set
  label: "Set mute level (dB)"
  kind: action
  command: "GCMLx"
  params:
    - name: x
      type: integer
      description: "-50 to -5 dB in 5 dB steps"
- id: gcml_query
  label: "Query mute level"
  kind: query
  command: "GCML?"
- id: gcmmv_set
  label: "Set main maximum volume (dB)"
  kind: action
  command: "GCMMVx"
  params:
    - name: x
      type: number
      description: "-40 to +10 dB, 0.5 dB steps"
- id: gcmmv_query
  label: "Query main maximum volume"
  kind: query
  command: "GCMMV?"
- id: gcz2mmv_set
  label: "Set Zone 2 maximum volume (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "GCZ2MMVx"
  params:
    - name: x
      type: number
      description: "-40 to +10 dB, 0.5 dB steps"
- id: gcz2mmv_query
  label: "Query Zone 2 maximum volume"
  kind: query
  command: "GCZ2MMV?"
- id: gcmpov_set
  label: "Set main power-on volume"
  kind: action
  command: "GCMPOVx"
  params:
    - name: x
      type: string
      description: "0=Last Used or -90 dB to <Main Max Volume>, 0.5 dB steps"
- id: gcmpov_query
  label: "Query main power-on volume"
  kind: query
  command: "GCMPOV?"
- id: gcz2pov_set
  label: "Set Zone 2 power-on volume (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "GCZ2POVx"
  params:
    - name: x
      type: string
      description: "0=Last Used or -90 dB to <Zone 2 Max Volume>, 0.5 dB steps"
- id: gcz2pov_query
  label: "Query Zone 2 power-on volume"
  kind: query
  command: "GCZ2POV?"
- id: gcmpoi_set
  label: "Set main power-on input"
  kind: action
  command: "GCMPOIx"
  params:
    - name: x
      type: string
      description: "0=Last Used or <Input List>"
- id: gcmpoi_query
  label: "Query main power-on input"
  kind: query
  command: "GCMPOI?"
- id: gcz2poi_set
  label: "Set Zone 2 power-on input (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "GCZ2POIx"
  params:
    - name: x
      type: string
      description: "0=Last Used or <Input List>"
- id: gcz2poi_query
  label: "Query Zone 2 power-on input"
  kind: query
  command: "GCZ2POI?"
- id: gchmmo_set
  label: "Set headphone mutes main outputs"
  kind: action
  command: "GCHMMOx"
  params:
    - name: x
      type: integer
      description: "0=No, 1=Yes"
- id: gchmmo_query
  label: "Query headphone mutes main outputs"
  kind: query
  command: "GCHMMO?"
- id: gcdsz_set
  label: "Set default streaming zone (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "GCDSZx"
  params:
    - name: x
      type: integer
      description: "0=Main, 1=Zone 2"
- id: gcdsz_query
  label: "Query default streaming zone"
  kind: query
  command: "GCDSZ?"
- id: gcfcsi_set
  label: "Set favor current streaming input (MRX 740/1140, AVM 70/90)"
  kind: action
  command: "GCFCSIx"
  params:
    - name: x
      type: integer
      description: "0=No, 1=Yes"
- id: gcfcsi_query
  label: "Query favor current streaming input"
  kind: query
  command: "GCFCSI?"
- id: gcnspo_set
  label: "Set no-signal power-off timeout"
  kind: action
  command: "GCNSPOx"
  params:
    - name: x
      type: integer
      description: "0=5min, 1=10min, 2=20min, 3=1h, 4=2h, 5=6h, 7=Never"
- id: gcnspo_query
  label: "Query no-signal power-off timeout"
  kind: query
  command: "GCNSPO?"
- id: gcshdmib_set
  label: "Set standby HDMI bypass source"
  kind: action
  command: "GCSHDMIBx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=Last Used, 2-8=HDMI 1-7"
- id: gcshdmib_query
  label: "Query standby HDMI bypass"
  kind: query
  command: "GCSHHDMI?"
- id: gccstby_set
  label: "Set connected standby (IP control in standby)"
  kind: action
  command: "GCCSTBYx"
  params:
    - name: x
      type: integer
      description: "0=Disabled, 1=Enabled. Must be Enabled for IP power-on to operate."
- id: gccstby_query
  label: "Query connected standby"
  kind: query
  command: "GCCSTBY?"
- id: gccecc_set
  label: "Set CEC control"
  kind: action
  command: "GCCECCx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=On"
- id: gccecc_query
  label: "Query CEC control"
  kind: query
  command: "GCCECC?"
- id: gccpfc_set
  label: "Set CEC power-off control"
  kind: action
  command: "GCCPFCx"
  params:
    - name: x
      type: integer
      description: "0=Disabled, 1=Enabled. CEC must be On."
- id: gccpfc_query
  label: "Query CEC power-off control"
  kind: query
  command: "GCCPFC?"
- id: gcctva_set
  label: "Set HDMI audio to TV"
  kind: action
  command: "GCCTVAx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=On. CEC must be Off."
- id: gcctva_query
  label: "Query HDMI audio to TV"
  kind: query
  command: "GCCTVA?"
- id: gcmlows_set
  label: "Set mute line-out when selecting (input)"
  kind: action
  command: "GCMLOWSx"
  params:
    - name: x
      type: integer
      description: "0=None, 1-7=HDMI 1-7, 8=HDMI ARC, 9-10=Digital Coax 1-2, 11-13=Digital Optical 1-3, 14-17=Analog 1-4. MRX 540/740/1140: 18=Analog 5. AVM 70/90: 18=Phono MM"
- id: gcmlows_query
  label: "Query mute line-out when selecting"
  kind: query
  command: "GCMLOWS?"
- id: gcmdows_set
  label: "Set mute digital-out when selecting (input)"
  kind: action
  command: "GCMDOWSx"
  params:
    - name: x
      type: integer
      description: "0=None, 1-7=HDMI 1-7, 8=HDMI ARC, 9-10=Digital Coax 1-2, 11-13=Digital Optical 1-3, 14-17=Analog 1-4. MRX 540/740/1140: 18=Analog 5. AVM 70/90: 18=Phono MM"
- id: gcmdows_query
  label: "Query mute digital-out when selecting"
  kind: query
  command: "GCMDOWS?"

# --- General Config - Triggers (t = 1..3) ---
- id: gctd_set
  label: "Set trigger delay"
  kind: action
  command: "GCTDx"
  params:
    - name: x
      type: integer
      description: "0=None, 1=250 ms"
- id: gctd_query
  label: "Query trigger delay"
  kind: query
  command: "GCTD?"
- id: gcttc_set
  label: "Set trigger control source"
  kind: action
  command: "GCTtCx"
  params:
    - name: t
      type: integer
      description: "Trigger 1-3"
    - name: x
      type: integer
      description: "0=Menu, 1=RS-232/IP"
- id: gcttc_query
  label: "Query trigger control source"
  kind: query
  command: "GCTtC?"
- id: gcttp_set
  label: "Set trigger power source"
  kind: action
  command: "GCTtPx"
  params:
    - name: t
      type: integer
    - name: x
      type: integer
      description: "MRX 540: 0=Off, 1=Main. MRX 740/1140, AVM 70/90: 0=Off, 1=Main, 2=Zone 2, 3=Main or Zone 2"
- id: gcttp_query
  label: "Query trigger power source"
  kind: query
  command: "GCTtP?"
- id: gcttii_set
  label: "Set trigger tied to input"
  kind: action
  command: "GCTtIix"
  params:
    - name: t
      type: integer
    - name: i
      type: integer
      description: "Input 1-ZZ (max 30)"
    - name: x
      type: integer
      description: "MRX 540: 0=Off, 1=Main. MRX 740/1140, AVM 70/90: 0=Off, 1=Main, 2=Zone 2, 3=Main or Zone 2"
- id: gcttii_query
  label: "Query trigger input assignment"
  kind: query
  command: "GCTtIi?"

# --- General Config - Remote Control ---
- id: gcdn_set
  label: "Set device name"
  kind: action
  command: "GCDNccc"
  params:
    - name: ccc
      type: string
      description: "Up to 16 characters: 0-9, A-Z, a-z, ' ', '-', '.', '/'"
- id: gcdn_query
  label: "Query device name"
  kind: query
  command: "GCDN?"
- id: gctcp_set
  label: "Set TCP listening port"
  kind: action
  command: "GCTCPxxxx"
  params:
    - name: xxxx
      type: integer
      description: "1025-49150"
- id: gctcp_query
  label: "Query TCP listening port"
  kind: query
  command: "GCTCP?"
- id: gcrir_set
  label: "Set rear IR enabled"
  kind: action
  command: "GCRIRx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=On"
- id: gcrir_query
  label: "Query rear IR state"
  kind: query
  command: "GCRIR?"
- id: gcfir_set
  label: "Set front IR enabled"
  kind: action
  command: "GCFIRx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=On"
- id: gcfir_query
  label: "Query front IR state"
  kind: query
  command: "GCFIR?"
- id: gctxs_set
  label: "Set Tx status reporting"
  kind: action
  command: "GCTXSx"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=IP only, 2=IP and RS-232"
- id: gctxs_query
  label: "Query Tx status reporting"
  kind: query
  command: "GCTXS?"

# --- General Config - IP Settings (i=1 Ethernet, i=2 Wi-Fi) ---
- id: gcipva_set
  label: "Apply IP setting change"
  kind: action
  command: "GCIPViA"
- id: gcipvm_set
  label: "Set IP mode (DHCP/manual)"
  kind: action
  command: "GCIPViMx"
  params:
    - name: i
      type: integer
      description: "1=Ethernet, 2=Wi-Fi"
    - name: x
      type: integer
      description: "0=Auto (DHCP), 1=Manual"
- id: gcipvm_query
  label: "Query IP mode"
  kind: query
  command: "GCIPViM?"
- id: gcipvi_set
  label: "Set IP address"
  kind: action
  command: "GCIPViIccc"
  params:
    - name: i
      type: integer
      description: "1=Ethernet, 2=Wi-Fi"
    - name: ccc
      type: string
      description: "Up to 15-char IPv4 address"
- id: gcipvi_query
  label: "Query IP address"
  kind: query
  command: "GCIPViI?"
- id: gcipvs_set
  label: "Set subnet mask"
  kind: action
  command: "GCIPViSccc"
  params:
    - name: i
      type: integer
    - name: ccc
      type: string
      description: "Up to 15-char IPv4 subnet mask"
- id: gcipvs_query
  label: "Query subnet mask"
  kind: query
  command: "GCIPViS?"
- id: gcipvg_set
  label: "Set gateway"
  kind: action
  command: "GCIPViGccc"
  params:
    - name: i
      type: integer
    - name: ccc
      type: string
      description: "Up to 15-char IPv4 gateway"
- id: gcipvg_query
  label: "Query gateway"
  kind: query
  command: "GCIPViG?"
- id: gcipvd_set
  label: "Set DNS"
  kind: action
  command: "GCIPViDccc"
  params:
    - name: i
      type: integer
    - name: ccc
      type: string
      description: "Up to 15-char IPv4 DNS"
- id: gcipvd_query
  label: "Query DNS"
  kind: query
  command: "GCIPViD?"

# --- IP Status (active channel) ---
- id: gcipstt_query
  label: "IP interface status (Ethernet/Wi-Fi/Connecting/Disconnected)"
  kind: query
  command: "GCIPSTT?"
- id: gcipstm_query
  label: "IP mode status"
  kind: query
  command: "GCIPSTM?"
- id: gcipsti_query
  label: "Active IP address status"
  kind: query
  command: "GCIPSTI?"
- id: gcipsts_query
  label: "Active subnet status"
  kind: query
  command: "GCIPSTS?"
- id: gcipstg_query
  label: "Active gateway status"
  kind: query
  command: "GCIPSTG?"
- id: gcipsdn_query
  label: "Active DNS status"
  kind: query
  command: "GCIPSDN?"

# --- Main Zone & Zone 2 (z=1 Main, z=2 Zone 2) ---
- id: zzpow_set
  label: "Zone power on/off"
  kind: action
  command: "ZzPOWy"
  params:
    - name: z
      type: integer
      description: "1=Main, 2=Zone 2 (where applicable)"
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: zzpow_query
  label: "Zone power state"
  kind: query
  command: "ZzPOW?"
- id: zzinp_set
  label: "Zone input select"
  kind: action
  command: "ZzINPy"
  params:
    - name: z
      type: integer
    - name: y
      type: integer
      description: "1-ZZ (number of active input configurations)"
- id: zzinp_query
  label: "Zone current input"
  kind: query
  command: "ZzINP?"
- id: zzvol_set
  label: "Zone volume set (dB)"
  kind: action
  command: "ZzVOLsyy"
  params:
    - name: z
      type: integer
    - name: s
      type: string
      description: "+ or -"
    - name: yy
      type: string
      description: "dB value (rounded to nearest valid)"
- id: zzvol_query
  label: "Zone volume (dB)"
  kind: query
  command: "ZzVOL?"
- id: zzvdn
  label: "Zone volume down (0.5 dB step)"
  kind: action
  command: "ZzVDN"
- id: zzvup
  label: "Zone volume up (0.5 dB step)"
  kind: action
  command: "ZzVUP"
- id: zzpvol_set
  label: "Zone volume set (percent)"
  kind: action
  command: "ZzPVOLyy"
  params:
    - name: z
      type: integer
    - name: yy
      type: integer
      description: "0-100, step 1%"
- id: zzpvol_query
  label: "Zone volume (percent)"
  kind: query
  command: "ZzPVOL?"
- id: zzpvdn
  label: "Zone volume percent down"
  kind: action
  command: "ZzPVDN"
- id: zzpvup
  label: "Zone volume percent up"
  kind: action
  command: "ZzPVUP"
- id: zzmut_set
  label: "Zone mute"
  kind: action
  command: "ZzMUTy"
  params:
    - name: z
      type: integer
    - name: y
      type: string
      description: "0=Unmute, 1=Mute, t=Toggle"
- id: zzmut_query
  label: "Zone mute state"
  kind: query
  command: "ZzMUT?"

# --- Main Zone only ---
- id: z1alm_set
  label: "Set audio listening mode (main zone)"
  kind: action
  command: "Z1ALMy"
  params:
    - name: y
      type: integer
      description: "0=None, 1=AnthemLogic-Cinema, 2=AnthemLogic-Music, 3=Dolby Surround, 4=DTS Neural:X, 5=DTS Virtual:X, 5=Stereo (note: source uses two '5's), 6=All Channel Stereo, 7=Mono (2-ch only), 8=All-Channel Mono (2-ch only)"
- id: z1alm_query
  label: "Query audio listening mode"
  kind: query
  command: "Z1ALM?"
- id: z1adn
  label: "Audio listening mode - next lower"
  kind: action
  command: "Z1ADN"
- id: z1aup
  label: "Audio listening mode - next higher"
  kind: action
  command: "Z1AUP"
- id: z1ton_set
  label: "Set tone (bass/treble)"
  kind: action
  command: "Z1TONyszz"
  params:
    - name: y
      type: integer
      description: "0=Bass, 1=Treble"
    - name: s
      type: string
      description: "+ or -"
    - name: zz
      type: number
      description: "-10 to +10 dB, step 0.5 dB"
- id: z1ton_query
  label: "Query tone setting"
  kind: query
  command: "Z1TONy?"
- id: z1tup
  label: "Tone up (bass or treble)"
  kind: action
  command: "Z1TUPy"
  params:
    - name: y
      type: integer
      description: "0=Bass, 1=Treble"
- id: z1tdn
  label: "Tone down (bass or treble)"
  kind: action
  command: "Z1TDNy"
- id: z1bal_set
  label: "Set balance"
  kind: action
  command: "Z1BALsyyy"
  params:
    - name: s
      type: string
      description: "+ or - (also accepts sign-less)"
    - name: yyy
      type: number
      description: "-5 to +5 with 0.5 dB steps"
- id: z1bal_query
  label: "Query balance"
  kind: query
  command: "Z1BAL?"
- id: z1blt
  label: "Balance shift left 0.5 dB"
  kind: action
  command: "Z1BLT"
- id: z1brt
  label: "Balance shift right 0.5 dB"
  kind: action
  command: "Z1BRT"
- id: z1dscs_set
  label: "Set Dolby Surround Centre Spread"
  kind: action
  command: "Z1DSCSy"
  params:
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: z1dscs_query
  label: "Query Centre Spread"
  kind: query
  command: "Z1DSCS?"
- id: z1lev_set
  label: "Set per-channel level offset"
  kind: action
  command: "Z1LEVyszz"
  params:
    - name: y
      type: string
      description: "1=Subwoofers, 5=Fronts, 6=Front Wides, 7=Center, 8=Surrounds, 9=Backs, A=Heights1, B=Heights2, C=Heights3, D=LFE"
    - name: s
      type: string
      description: "+ or -"
    - name: zz
      type: number
      description: "Subs/fronts/wides/center/surrounds/backs/heights: -10 to +10 dB. LFE: -10 to 0 dB."
- id: z1lev_query
  label: "Query per-channel level offset"
  kind: query
  command: "Z1LEVy?"
- id: z1lup
  label: "Per-channel level up"
  kind: action
  command: "Z1LUPy"
  params:
    - name: y
      type: string
      description: "Channel code 1/5/6/7/8/9/A/B/C/D"
- id: z1ldn
  label: "Per-channel level down"
  kind: action
  command: "Z1LDNy"

# --- ARC Metadata ---
- id: z1arcval_query
  label: "Query ARC valid flag"
  kind: query
  command: "Z1ARCVAL?"
- id: z1arcupl_query
  label: "Query ARC upload date (16 chars)"
  kind: query
  command: "Z1ARCUPL?"
- id: z1arcnam_query
  label: "Query ARC name (16 chars)"
  kind: query
  command: "Z1ARCNAM?"

# --- System Control - Audio ---
- id: z1dyn_set
  label: "Set Dolby Digital dynamic range"
  kind: action
  command: "Z1DYNy"
  params:
    - name: y
      type: integer
      description: "0=Normal, 1=Reduced, 2=Late Night"
- id: z1dyn_query
  label: "Query Dolby Digital dynamic range"
  kind: query
  command: "Z1DYN?"
- id: z1dia_query
  label: "Query Dolby Digital dialog normalization"
  kind: query
  command: "Z1DIA?"

# --- System Control - Basic Control ---
- id: z1msg_set
  label: "Display custom on-screen status message"
  kind: action
  command: "Z1MSGxyyyy"
  params:
    - name: x
      type: integer
      description: "Row 0-3"
    - name: yyyy
      type: string
      description: "Message up to 32 chars"
- id: z1shc_set
  label: "Show/hide custom message"
  kind: action
  command: "Z1SHCy"
  params:
    - name: y
      type: integer
      description: "0=Hide, 1=Show"
- id: z1shc_query
  label: "Query custom message visibility"
  kind: query
  command: "Z1SHC?"
- id: z1smd_set
  label: "Set setup menu display"
  kind: action
  command: "Z1SMDx"
  params:
    - name: x
      type: string
      description: "0=Close, 1=Open, t=Toggle"
- id: z1smd_query
  label: "Query setup menu display state"
  kind: query
  command: "Z1SMD?"
- id: zzsim_set
  label: "Simulate IR command for zone"
  kind: action
  command: "ZzSIMyyyy"
  params:
    - name: z
      type: integer
    - name: yyyy
      type: string
      description: "4-hex-digit IR code (leading zeros required)"
- id: rxset_set
  label: "Trigger set (x = 1, 2, 3)"
  kind: action
  command: "RxSETy"
  params:
    - name: x
      type: integer
      description: "1=Trigger 1, 2=Trigger 2, 3=Trigger 3"
    - name: y
      type: integer
      description: "0=Off, 1=On"
- id: rxset_query
  label: "Query trigger state"
  kind: query
  command: "RxSET?"

# --- Advanced Control ---
- id: ctrl_set
  label: "Exclusive control"
  kind: action
  command: "CTRLxy"
  params:
    - name: x
      type: integer
      description: "0=Arc, 1=Scratchpad, 2=Firmware"
    - name: y
      type: integer
      description: "0=Released, 1=Taken"
- id: ctrl_query
  label: "Query exclusive control state"
  kind: query
  command: "CTRLx?"
- id: cpys_set
  label: "Copy settings"
  kind: action
  command: "CPYSxy"
  params:
    - name: x
      type: string
      description: "Source: Current/User/Installer/Scratchpad"
    - name: y
      type: string
      description: "Destination: Current/User/Installer/Scratchpad"
- id: cpys01
  label: "Save user settings"
  kind: action
  command: "CPYS01"
- id: cpys02
  label: "Save installer settings"
  kind: action
  command: "CPYS02"
- id: cpys10
  label: "Load user settings"
  kind: action
  command: "CPYS10"
- id: cpys20
  label: "Load installer settings"
  kind: action
  command: "CPYS20"
- id: spdsz_query
  label: "Query scratchpad size"
  kind: query
  command: "SPDSZ?"
- id: cjfupd_set
  label: "Request NM update check"
  kind: action
  command: "CJFUPDx"
  params:
    - name: x
      type: integer
      description: "0=USB, 1=Network"
- id: updusb_set
  label: "Check for update via USB"
  kind: action
  command: "UPDUSB"
- id: updota_set
  label: "Check for update via network"
  kind: action
  command: "UPDOTA"
- id: nmwps_set
  label: "Trigger WPS pushbutton on NM"
  kind: action
  command: "NMWPS"
- id: rwifis_set
  label: "Reset NM wireless settings"
  kind: action
  command: "RWIFIS"
- id: ldfds_set
  label: "Load factory defaults"
  kind: action
  command: "LDFDS"
- id: lotfs_set
  label: "Reset on-the-fly settings"
  kind: action
  command: "LOTFS"
- id: z1emsg_set
  label: "Set exclusive-control message (title + body)"
  kind: action
  command: "Z1EMSGrt"
  params:
    - name: r
      type: integer
      description: "0=Title, 1=Message"
    - name: t
      type: string
      description: "1-32 chars: ' ', '-', '.', '/', 0-9, A-Z, a-z"
- id: z1eprg_set
  label: "Set exclusive-control progress"
  kind: action
  command: "Z1EPRGx"
  params:
    - name: x
      type: integer
      description: "0-100 progress, 101 hides"
- id: z1spr_set
  label: "Show prompt (1/2/3 options)"
  kind: action
  command: "Z1SPRx"
  params:
    - name: x
      type: integer
      description: "0=Close, 1=1-option prompt, 2=2-option prompt, 3=3-option prompt"
- id: z1pro_set
  label: "Set prompt option text"
  kind: action
  command: "Z1PROxt"
  params:
    - name: x
      type: integer
      description: "0=Option 1, 1=Option 2, 2=Option 3"
    - name: t
      type: string
      description: "Up to 16 chars"
- id: z1prm_set
  label: "Set prompt message"
  kind: action
  command: "Z1PRMmsg"
  params:
    - name: msg
      type: string
      description: "Up to 32 chars"
- id: z1prs_query
  label: "Query current prompt selection"
  kind: query
  command: "Z1PRS?"

# --- Flash Access ---
- id: prgs_set
  label: "Program start"
  kind: action
  command: "PRGSxy"
  params:
    - name: x
      type: integer
      description: "0=arc, 1=scratchpad, 2=firmware-MCU, 3=firmware-dsp, 4=firmware-fp, 5=firmware-osd"
    - name: y
      type: integer
      description: "0=Not ok to program, 1=Ok to program"
- id: prgs_query
  label: "Query program state"
  kind: query
  command: "PRGSx?"
- id: prgr_set
  label: "Program resume"
  kind: action
  command: "PRGRxyz"
  params:
    - name: x
      type: integer
      description: "Mode (same as PRGS)"
    - name: y
      type: string
      description: "<offset32><checksum32> hex"
- id: prgr_query
  label: "Query program resume parameters"
  kind: query
  command: "PRGRx?"
- id: prgb_set
  label: "Program block"
  kind: action
  command: "PRGBxy"
  params:
    - name: x
      type: integer
    - name: y
      type: string
      description: "<offset32><countbytes16><byte1>...<byteN> hex"
- id: prgf_set
  label: "Program finish"
  kind: action
  command: "PRGFxy"
  params:
    - name: x
      type: integer
    - name: y
      type: string
      description: "<numberofbytes32><applicationchecksum32> hex"
- id: rdbl_query
  label: "Read block"
  kind: query
  command: "RDBLxy?"
  params:
    - name: x
      type: integer
    - name: y
      type: string
      description: "<offset32><countbytes16> hex"

# --- ARC Mode ---
- id: z1arcmen_set
  label: "ARC - measure with EQ applied"
  kind: action
  command: "Z1ARCMENx"
  params:
    - name: x
      type: integer
      description: "0=Disabled, 1-4=Profile N"
- id: z1arcprc_set
  label: "ARC - measure with speaker processing applied"
  kind: action
  command: "Z1ARCPRCx"
  params:
    - name: x
      type: integer
      description: "0=Disabled, 1-4=Profile N"
- id: z1arccrp_set
  label: "ARC test tone channel bitmask"
  kind: action
  command: "Z1ARCCRP<bitmask>"
  params:
    - name: bitmask
      type: string
      description: "8-hex-char bitmask selecting channels (see Channel Bit Masks table)"
- id: z1arcclo_set
  label: "ARC chirp level offset (dB)"
  kind: action
  command: "Z1ARCCLOx"
  params:
    - name: x
      type: number
      description: "-50 to +10 dB, 0.5 dB step"

# --- Stream Service ---
- id: nmsn_set
  label: "Set stream service name (UTF-8 hex)"
  kind: action
  command: "NMSNstr"
  params:
    - name: str
      type: string
      description: "Hex-encoded UTF-8, max 64 bytes"
- id: nmti_set
  label: "Set stream title (UTF-8 hex)"
  kind: action
  command: "NMTIstr"
  params:
    - name: str
      type: string
      description: "Hex-encoded UTF-8, max 64 bytes"
- id: nmar_set
  label: "Set stream artist (UTF-8 hex)"
  kind: action
  command: "NMARstr"
- id: nmal_set
  label: "Set stream album (UTF-8 hex)"
  kind: action
  command: "NMALstr"
- id: nmte_set
  label: "Set stream playback state"
  kind: action
  command: "NMTEx"
  params:
    - name: x
      type: integer
      description: "0=Stopped, 1=Transitioning, 2=Paused, 3=Playing"
- id: nmte_query
  label: "Query stream playback state"
  kind: query
  command: "NMTE?"
- id: nmpc_set
  label: "Pause playback"
  kind: action
  command: "NMPC"
- id: nmsc_set
  label: "Stop playback"
  kind: action
  command: "NMSC"

# --- Other Commands (fault counters / factory / bulk) ---
- id: fcc_query
  label: "Query fault counter count"
  kind: query
  command: "FCC?"
- id: fcq_query
  label: "Query fault counter value"
  kind: query
  command: "FCQx?"
  params:
    - name: x
      type: string
      description: "8-bit hex-encoded ascii index"
- id: fcr_set
  label: "Reset fault counter"
  kind: action
  command: "FCRx"
  params:
    - name: x
      type: string
      description: "8-bit hex-encoded ascii index"
- id: fcn_query
  label: "Query fault counter name"
  kind: query
  command: "FCNx?"
  params:
    - name: x
      type: string
      description: "8-bit hex-encoded ascii index"
- id: pruid1_query
  label: "Query serial number (text string)"
  kind: query
  command: "PRUID1?"
- id: pruid0_set
  label: "Commit factory settings (commit key required)"
  kind: action
  command: "PRUID0{key}"
  params:
    - name: key
      type: string
      description: "UUID 7F36FD81-7A63-43EF-8246-270496C147F9"
- id: bsc1
  label: "Bulk settings changed"
  kind: action
  command: "BSC1"
```

## Feedbacks
```yaml
# Standard acknowledgements and error envelopes documented in source.
# - id: ack_ok
#   type: enum
#   values: [";", "!E", "!R", "!I", "!Z"]   # ';' = success; '!E<cmd>' = cannot execute; '!R<cmd>' = out of range; '!I<cmd>' = invalid; '!Z<cmd>' = zone off
# - id: z1pow_state
#   type: enum
#   values: [on, off]
# - id: z1vir_resolution
#   type: integer
#   description: "0=no input, 1=other, 2=1080p60, 3=1080p50, 4=1080p24, 5=1080i60, 6=1080i50, 7=720p60, 8=720p50, 9=576p50, 10=576i50, 11=480p60, 12=480i60, 13=3D, 14=4k60, 15=4k50, 16=4k24"
# - id: z1aic_channels
#   type: integer
#   description: "0=no input, 1=other, 2=mono, 3=2-channel, 4=5.1, 5=7.1, 6=Atmos, 7=DTS-X"
# - id: z1aif_format
#   type: integer
#   description: "0=no input, 1=Analog, 2=PCM, 3=Dolby, 4=DSD, 5=DTS, 6=Atmos, 7=DTS-X"
# - id: zzmut_state
#   type: enum
#   values: [unmute, mute]
# - id: zzvol_db
#   type: string
#   description: "Signed dB value, e.g. ZxVOL+/-yy"
# - id: nmte_stream_state
#   type: enum
#   values: [stopped, transitioning, paused, playing]
```

## Variables
```yaml
# Driver-level config that lives in flash / settings:
# - id: tcp_port
#   description: "TCP listen port set via GCTCPxxxx (1025-49150)"
# - id: device_name
#   description: "Up to 16 chars; set via GCDNccc; reported in DDP packet"
# - id: device_discovery_packet
#   description: "80 65 82 67 00 00 <announce> 01 <version32> <tcp_port32> device_name[16] model_name[16] serial_number[16]"
```

## Events
```yaml
# Source documents fault counters, bulk-settings invalidation notification, and DDP
# broadcast as observable but unsolicited signals.
# - id: bsc1_event
#   description: "Host MCU broadcasts BSC1 to all open connections when bulk settings change. Receiving devices should invalidate cached settings."
# - id: ddp_broadcast
#   description: "Sent on each network (re)connect and on shutdown (off byte = 1). 80 65 82 67 00 00 <announce> 01 <version32> <tcp_port32> device_name[16] model_name[16] serial_number[16]."
# - id: ddp_response_to_announce
#   description: "When the device receives a DDP packet with announce=1, it broadcasts its own DDP packet."
# - id: prgr_resume_data
#   description: "PRGRx? returns PRGRxyz containing <offset32><checksum32> for resume coordination."
# - id: rdbl_block_data
#   description: "Host MCU responds to RDBL? with RDBLxyz where z = <byte1>...<byteN>"
```

## Macros
```yaml
# UNRESOLVED: source does not define reusable multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
- Semicolon `;` is the only valid command terminator; every command MUST end in `;`.
- Max command length 256 bytes; max response length 258 bytes.
- Avg command processing latency <30 ms; max per-command 100 ms.
- RS-232 hosts should wait at least 1 s for response before retransmit.
- If standby IP control is disabled, the unit can still be power-on'd serially, but the power-on command must be sent twice (wait for `;` response between sends, ~1 s). Enable `GCCSTBY1` (connected standby) to avoid the double-send.
- Only `IDM?`, `ZxPOWy`, `ZxPOW?` are valid in standby.
- TCP/IP cable link carries the exact same ASCII command set as RS-232 over a raw TCP socket (no framing beyond `;`). TCP port defaults to user-configured value via `GCTCPxxxx`; no factory default stated.
- DDP ("PARC" magic bytes 0x50 0x41 0x52 0x43) is broadcast on each network state change for discovery on the local subnet.
- IR codes for `ZzSIMyyyy` use 4-hex-digit codes; see the IR table (Keys 0..36) in the source.

<!-- UNRESOLVED: firmware version compatibility per model not stated; no factory-default TCP port stated. -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/sandbox1-anthemav/an/MRX-x40-AVM-70-90-IP-RS-232-v5-20251202184749251.xls
retrieved_at: 2026-09-02T16:13:54.117Z
last_checked_at: 2026-09-02T22:16:36.639Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:16:36.639Z
matched_actions: 399
action_count: 399
confidence: medium
summary: "All 399 spec actions match literally in the source command table; transport values (115200/8/N/1) verified; spec covers the full source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility per model is not stated in source"
- "TCP port is user-configurable 1025-49150 via GCTCPxxxx; no fixed default stated"
- "source does not define reusable multi-step sequences"
- "source contains no explicit safety warnings or interlock procedures"
- "firmware version compatibility per model not stated; no factory-default TCP port stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
