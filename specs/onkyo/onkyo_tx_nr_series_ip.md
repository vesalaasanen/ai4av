---
spec_id: admin/onkyo-tx-nr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-NR Series Control Spec"
manufacturer: Onkyo
model_family: "Onkyo TX-NR Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "Onkyo TX-NR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-09-02T16:03:07.338Z
last_checked_at: 2026-10-07T20:50:13.041Z
generated_at: 2026-10-07T20:50:13.041Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Some commands (e.g. XM/SIRIUS/HD Radio/Network/Net-Tune) are model-conditional; downstream code must guard on device capability."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated in source. The source is the Integra protocol document, not a model-specific manual, so per-model capability deltas (which zones are present, which tuners are built in, which listening modes decode, etc.) cannot be enumerated here."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:50:13.041Z
  matched_actions: 495
  action_count: 495
  confidence: medium
  summary: "All 495 units match source mnemonics with correct params, transport values are stated in the source, and no source command is missing. The source is a generic Integra ISCP guide, so model-level applicability is only inferred. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Onkyo TX-NR Series Control Spec

## Summary
Control spec for Onkyo TX-NR Series AV receivers via the Integra Serial Communication Protocol (ISCP) v1.15, supporting both RS-232 (3-wire, 9600 baud) and Ethernet (eISCP over TCP port 60128). All commands are 3-character mnemonics with variable-length parameters, wrapped in a unit-type header. The protocol covers power, volume, input selection, listening modes, tuner/network/USB playback, multi-zone control (Zones 2–4), and RI-system passthrough.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Some commands (e.g. XM/SIRIUS/HD Radio/Network/Net-Tune) are model-conditional; downstream code must guard on device capability. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60128  # default eISCP port; receiver-configurable range 49152-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# powerable    - PWR/PW2/PW3/PW4 set on/standby
# routable     - SLI/SLR/SLA/HDO/VOS/RES select input/output
# queryable    - QSTN suffix queries return current state
# levelable    - MVL/ZVL/VL3/VL4 + tone (TFR/TFW/TFH/TCT/TSR/TSB/TSW/ZTN/TN3) control volume/level
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# ISCP framing (RS-232):  !1{CMD}{PARAM}[CR]
#   - "!" start, "1" unit-type (Receiver), 3-char command, parameters, terminator
#   - terminator: [CR] or [LF] or [CR][LF]
# ISCP framing (eISCP/TCP): ISCP message wrapped in 16-byte big-endian header
#   - bytes 0-3: "ISCP"
#   - bytes 4-7: header size (0x00000010, BIGENDIAN)
#   - bytes 8-11: data size (BIGENDIAN)
#   - byte 12: version (0x01)
#   - bytes 13-15: reserved (0x000000)
#   - data: !1{CMD}{PARAM}[EOF][CR][LF]  (terminator model-dependent)
#
# Each action below carries the literal ISCP command template "{CMD}{PARAM}".
# The full wire payload is "!" + "1" + command_template + terminator
# (RS-232 adds [CR]; eISCP adds [EOF][CR][LF] inside the data field of the header).
# Param values are documented code tables from the source.

# ---------------- Amplifier ----------------
- id: pwr_set
  label: System Power
  kind: action
  command: "PWR{code}"
  params:
    - name: code
      type: string
      description: "00 = standby, 01 = on"
- id: pwr_query
  label: System Power Query
  kind: query
  command: "PWRQSTN"
  params: []

- id: amt_set
  label: Audio Muting
  kind: action
  command: "AMT{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, TG = wrap-around"
- id: amt_query
  label: Audio Muting Query
  kind: query
  command: "AMTQSTN"
  params: []

- id: spa_set
  label: Speaker A
  kind: action
  command: "SPA{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap-around"
- id: spa_query
  label: Speaker A Query
  kind: query
  command: "SPAQSTN"
  params: []
- id: spb_set
  label: Speaker B
  kind: action
  command: "SPB{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap-around"
- id: spb_query
  label: Speaker B Query
  kind: query
  command: "SPBQSTN"
  params: []

- id: spl_set
  label: Speaker Layout
  kind: action
  command: "SPL{code}"
  params:
    - name: code
      type: string
      description: "SB = SurrBack, FH = Front High (or SB+FH), FW = Front Wide (or SB+FW), UP = wrap-around"
- id: spl_query
  label: Speaker Layout Query
  kind: query
  command: "SPLQSTN"
  params: []

- id: mvl_set
  label: Master Volume
  kind: action
  command: "MVL{code}"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100), 00-50 hex (0-80), UP, DOWN, UP1 (+1dB), DOWN1 (-1dB)"
- id: mvl_query
  label: Master Volume Query
  kind: query
  command: "MVLQSTN"
  params: []

- id: tfr_set
  label: Tone Front (Bass/Treble)
  kind: action
  command: "TFR{code}"
  params:
    - name: code
      type: string
      description: "Bxx (bass -A..00..+A, 2-step), Txx (treble -A..00..+A, 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tfr_query
  label: Tone Front Query
  kind: query
  command: "TFRQSTN"
  params: []

- id: tfw_set
  label: Tone Front Wide
  kind: action
  command: "TFW{code}"
  params:
    - name: code
      type: string
      description: "Bxx, Txx (-A..00..+A, 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tfw_query
  label: Tone Front Wide Query
  kind: query
  command: "TFWQSTN"
  params: []

- id: tfh_set
  label: Tone Front High
  kind: action
  command: "TFH{code}"
  params:
    - name: code
      type: string
      description: "Bxx, Txx (-A..00..+A, 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tfh_query
  label: Tone Front High Query
  kind: query
  command: "TFHQSTN"
  params: []

- id: tct_set
  label: Tone Center
  kind: action
  command: "TCT{code}"
  params:
    - name: code
      type: string
      description: "Bxx, Txx (-A..00..+A, 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tct_query
  label: Tone Center Query
  kind: query
  command: "TCTQSTN"
  params: []

- id: tsr_set
  label: Tone Surround
  kind: action
  command: "TSR{code}"
  params:
    - name: code
      type: string
      description: "Bxx, Txx (-A..00..+A, 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tsr_query
  label: Tone Surround Query
  kind: query
  command: "TSRQSTN"
  params: []

- id: tsb_set
  label: Tone Surround Back
  kind: action
  command: "TSB{code}"
  params:
    - name: code
      type: string
      description: "Bxx, Txx (-A..00..+A, 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tsb_query
  label: Tone Surround Back Query
  kind: query
  command: "TSBQSTN"
  params: []

- id: tsw_set
  label: Tone Subwoofer
  kind: action
  command: "TSW{code}"
  params:
    - name: code
      type: string
      description: "Bxx (-A..00..+A, 2-step), BUP, BDOWN"
- id: tsw_query
  label: Tone Subwoofer Query
  kind: query
  command: "TSWQSTN"
  params: []

- id: slp_set
  label: Sleep Timer
  kind: action
  command: "SLP{code}"
  params:
    - name: code
      type: string
      description: "01-5A hex (1-90 min), OFF, UP"
- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "SLPQSTN"
  params: []

- id: slc_test
  label: Speaker Calibration TEST
  kind: action
  command: "SLCTEST"
  params: []
- id: slc_chsel
  label: Speaker Calibration CH SEL
  kind: action
  command: "SLCCHSEL"
  params: []
- id: slc_up
  label: Speaker Calibration Level +
  kind: action
  command: "SLCUP"
  params: []
- id: slc_down
  label: Speaker Calibration Level -
  kind: action
  command: "SLCDOWN"
  params: []

- id: swl_set
  label: Subwoofer (temp) Level
  kind: action
  command: "SWL{code}"
  params:
    - name: code
      type: string
      description: "-F..00..+C hex (-15..0..+12 dB), UP, DOWN"
- id: swl_query
  label: Subwoofer (temp) Level Query
  kind: query
  command: "SWLQSTN"
  params: []

- id: ctl_set
  label: Center (temp) Level
  kind: action
  command: "CTL{code}"
  params:
    - name: code
      type: string
      description: "-C..00..+C hex (-12..0..+12 dB), UP, DOWN"
- id: ctl_query
  label: Center (temp) Level Query
  kind: query
  command: "CTLQSTN"
  params: []

- id: dif_show
  label: Display Information Mode
  kind: action
  command: "DIF{code}"
  params:
    - name: code
      type: string
      description: "00 = program format, 01 = digital input, 02 = digital format, 03 = bass level, 04 = treble level"
- id: dif_display_set
  label: Display Mode
  kind: action
  command: "DIF{code}"
  params:
    - name: code
      type: string
      description: "00 = selector+volume, 01 = selector+listening mode, 02 = digital format (temp), 03 = video format (temp), TG = wrap-around"
- id: dif_display_query
  label: Display Mode Query
  kind: query
  command: "DIFQSTN"
  params: []

- id: dim_set
  label: Dimmer Level
  kind: action
  command: "DIM{code}"
  params:
    - name: code
      type: string
      description: "00 = Bright, 01 = Dim, 02 = Dark, 03 = Shut-Off, 08 = Bright & LED OFF, DIM = wrap-around"
- id: dim_query
  label: Dimmer Level Query
  kind: query
  command: "DIMQSTN"
  params: []

- id: osd_menu
  label: OSD Menu
  kind: action
  command: "OSDMENU"
  params: []
- id: osd_up
  label: OSD Up
  kind: action
  command: "OSDUP"
  params: []
- id: osd_down
  label: OSD Down
  kind: action
  command: "OSDDOWN"
  params: []
- id: osd_right
  label: OSD Right
  kind: action
  command: "OSDRIGHT"
  params: []
- id: osd_left
  label: OSD Left
  kind: action
  command: "OSDLEFT"
  params: []
- id: osd_enter
  label: OSD Enter
  kind: action
  command: "OSDENTER"
  params: []
- id: osd_exit
  label: OSD Exit
  kind: action
  command: "OSDEXIT"
  params: []
- id: osd_audio
  label: OSD Audio Adjust
  kind: action
  command: "OSDAUDIO"
  params: []
- id: osd_video
  label: OSD Video Adjust
  kind: action
  command: "OSDVIDEO"
  params: []

- id: mem_store
  label: Memory Store
  kind: action
  command: "MEMSTR"
  params: []
- id: mem_recall
  label: Memory Recall
  kind: action
  command: "MEMRCL"
  params: []
- id: mem_lock
  label: Memory Lock
  kind: action
  command: "MEMLOCK"
  params: []
- id: mem_unlock
  label: Memory Unlock
  kind: action
  command: "MEMUNLK"
  params: []

- id: ifa_query
  label: Audio Information Query
  kind: query
  command: "IFAQSTN"
  params: []
- id: ifv_query
  label: Video Information Query
  kind: query
  command: "IFVQSTN"
  params: []

# ---------------- Unit (input/output) ----------------
- id: sli_set
  label: Input Selector
  kind: action
  command: "SLI{code}"
  params:
    - name: code
      type: string
      description: "00-06=VIDEO1-7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/USB(Front), 2A=USB(Rear), 40=Universal PORT, 30=MULTI CH, 31=XM*, 32=SIRIUS*, UP, DOWN"
- id: sli_query
  label: Input Selector Query
  kind: query
  command: "SLIQSTN"
  params: []

- id: slr_set
  label: RECOUT Selector
  kind: action
  command: "SLR{code}"
  params:
    - name: code
      type: string
      description: "00-06=VIDEO1-7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH, 31=XM, 7F=OFF, 80=SOURCE"
- id: slr_query
  label: RECOUT Selector Query
  kind: query
  command: "SLRQSTN"
  params: []

- id: sla_set
  label: Audio Selector
  kind: action
  command: "SLA{code}"
  params:
    - name: code
      type: string
      description: "00 = AUTO, 01 = MULTI-CHANNEL, 02 = ANALOG, 03 = iLINK, 04 = HDMI, 05 = COAX/OPT, 06 = BALANCE, UP = wrap"
- id: sla_query
  label: Audio Selector Query
  kind: query
  command: "SLAQSTN"
  params: []

- id: tga_set
  label: 12V Trigger A
  kind: action
  command: "TGA{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on"
- id: tgb_set
  label: 12V Trigger B
  kind: action
  command: "TGB{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on"
- id: tgc_set
  label: 12V Trigger C
  kind: action
  command: "TGC{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on"

- id: vos_set
  label: Video Output Selector (Japanese model)
  kind: action
  command: "VOS{code}"
  params:
    - name: code
      type: string
      description: "00 = D4, 01 = Component"
- id: vos_query
  label: Video Output Selector Query
  kind: query
  command: "VOSQSTN"
  params: []

- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "HDO{code}"
  params:
    - name: code
      type: string
      description: "00 = No Analog, 01 = Main, 02 = Sub, 03 = Both, 04 = Both(Main), 05 = Both(Sub), UP = wrap"
- id: hdo_query
  label: HDMI Output Selector Query
  kind: query
  command: "HDOQSTN"
  params: []

- id: res_set
  label: Monitor Out Resolution
  kind: action
  command: "RES{code}"
  params:
    - name: code
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p(HDMI), 06=Source, 07=1080p/24fs(HDMI), UP=wrap"
- id: res_query
  label: Monitor Out Resolution Query
  kind: query
  command: "RESQSTN"
  params: []

- id: isf_set
  label: ISF Mode
  kind: action
  command: "ISF{code}"
  params:
    - name: code
      type: string
      description: "00 = Custom, 01 = Day, 02 = Night, UP = wrap"
- id: isf_query
  label: ISF Mode Query
  kind: query
  command: "ISFQSTN"
  params: []

# ---------------- Surround ----------------
- id: lmd_set
  label: Listening Mode
  kind: action
  command: "LMD{code}"
  params:
    - name: code
      type: string
      description: "00=Stereo, 01=Direct, 02=Surround, 03=Film/Game-RPG, 04=THX, 05=Action/Game-Action, 06=Musical/Game-Rock, 07=Mono Movie, 08=Orchestra, 09=Unplugged, 0A=Studio-Mix, 0B=TV Logic, 0C=All Ch Stereo, 0D=Theater-Dimensional, 0E=Enhanced7/Game-Sports, 0F=Mono, 11=Pure Audio, 12=Multiplex, 13=Full Mono, 14=Dolby Virtual, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch/Straight Decode*, 41=Dolby EX/DTS ES/Dolby EX*, 42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games, 50=U2/S2 Cinema/Cinema2, 51=MusicMode/U2/S2 Music, 52=Games Mode/U2/S2 Games, 80=PLII/PLIIx Movie, 81=PLII/PLIIx Music, 82=Neo:6 Cinema, 83=Neo:6 Music, 84=PLII/PLIIx THX Cinema, 85=Neo:6 THX Cinema, 86=PLII/PLIIx Game, 87=Neural Surr*, 88=Neural THX/Surround, 89=PLII/PLIIx THX Games, 8A=Neo:6 THX Games, 8B=PLII/PLIIx THX Music, 8C=Neo:6 THX Music, 8D=Neural THX Cinema, 8E=Neural THX Music, 8F=Neural THX Games, 90=PLIIz Height, 91=Neo:6 Cinema DTS SS, 92=Neo:6 Music DTS SS, 93=Neural Digital Music, 94=PLIIz Height+THX Cinema, 95=PLIIz Height+THX Music, 96=PLIIz Height+THX Games, 97=PLIIz Height+THX U2/S2 Cinema, 98=PLIIz Height+THX U2/S2 Music, 99=PLIIz Height+THX U2/S2 Games, A0=PLIIx/PLII Movie+DSX, A1=PLIIx/PLII Music+DSX, A2=PLIIx/PLII Game+DSX, A3=Neo:6 Cinema+DSX, A4=Neo:6 Music+DSX, A5=Neural Surr+DSX, A6=Neural Digital Music+DSX, A7=Dolby EX+DSX, UP/DOWN/MOVIE/MUSIC/GAME"
- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "LMDQSTN"
  params: []

- id: ltn_set
  label: Late Night
  kind: action
  command: "LTN{code}"
  params:
    - name: code
      type: string
      description: "00=Off, 01=Low@DD/On@TrueHD, 02=High@DD/On@TrueHD, 03=Auto@TrueHD, UP=wrap"
- id: ltn_query
  label: Late Night Query
  kind: query
  command: "LTNQSTN"
  params: []

- id: ras_reaq_academy_set
  label: Re-EQ/Academy Filter
  kind: action
  command: "RAS{code}"
  params:
    - name: code
      type: string
      description: "00 = both off, 01 = Re-EQ on, 02 = Academy on, UP = wrap"
- id: ras_reaq_academy_query
  label: Re-EQ/Academy Query
  kind: query
  command: "RASQSTN"
  params: []

- id: ras_reaq_set
  label: Re-EQ
  kind: action
  command: "RAS{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap"
- id: ras_reaq_query
  label: Re-EQ Query
  kind: query
  command: "RASQSTN"
  params: []

- id: ras_cinema_set
  label: Cinema Filter
  kind: action
  command: "RAS{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap"
- id: ras_cinema_query
  label: Cinema Filter Query
  kind: query
  command: "RASQSTN"
  params: []

- id: ady_set
  label: Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  command: "ADY{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap"
- id: ady_query
  label: Audyssey 2EQ/MultEQ/MultEQ XT Query
  kind: query
  command: "ADYQSTN"
  params: []

- id: adq_set
  label: Audyssey Dynamic EQ
  kind: action
  command: "ADQ{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap"
- id: adq_query
  label: Audyssey Dynamic EQ Query
  kind: query
  command: "ADQQSTN"
  params: []

- id: adv_set
  label: Audyssey Dynamic Volume
  kind: action
  command: "ADV{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = light, 02 = medium, 03 = heavy, UP = wrap"
- id: adv_query
  label: Audyssey Dynamic Volume Query
  kind: query
  command: "ADVQSTN"
  params: []

- id: dvl_set
  label: Dolby Volume
  kind: action
  command: "DVL{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = low, 02 = mid, 03 = high, UP = wrap"
- id: dvl_query
  label: Dolby Volume Query
  kind: query
  command: "DVLQSTN"
  params: []

- id: mot_set
  label: Music Optimizer
  kind: action
  command: "MOT{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, UP = wrap"
- id: mot_query
  label: Music Optimizer Query
  kind: query
  command: "MOTQSTN"
  params: []

# ---------------- Tuner ----------------
- id: tun_set
  label: Tuning (Main)
  kind: action
  command: "TUN{code}"
  params:
    - name: code
      type: string
      description: "nnnnn = frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch; XM first two digits = 00), UP, DOWN"
- id: tun_query
  label: Tuning Query (Main)
  kind: query
  command: "TUNQSTN"
  params: []

- id: prs_set
  label: Tuner Preset
  kind: action
  command: "PRS{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (preset 1-40) or 01-1E hex (preset 1-30), UP, DOWN"
- id: prs_query
  label: Tuner Preset Query
  kind: query
  command: "PRSQSTN"
  params: []

- id: prm_set
  label: Tuner Preset Memory
  kind: action
  command: "PRM{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (preset 1-40) or 01-1E hex (preset 1-30)"

- id: rds_set
  label: RDS Information
  kind: action
  command: "RDS{code}"
  params:
    - name: code
      type: string
      description: "00 = RT, 01 = PTY, 02 = TP, UP = wrap"

- id: pts_set
  label: PTY Scan
  kind: action
  command: "PTS{code}"
  params:
    - name: code
      type: string
      description: "00-1E hex (PTY 0-30), ENTER"
- id: tps_start
  label: TP Scan Start
  kind: action
  command: "TPS"
  params: []
- id: tps_enter
  label: TP Scan Finish
  kind: action
  command: "TPSENTER"
  params: []

# ---------------- XM ----------------
- id: xcn_query
  label: XM Channel Name Query
  kind: query
  command: "XCNQSTN"
  params: []
- id: xat_query
  label: XM Artist Name Query
  kind: query
  command: "XATQSTN"
  params: []
- id: xti_query
  label: XM Title Query
  kind: query
  command: "XTIQSTN"
  params: []
- id: xch_set
  label: XM Channel Number
  kind: action
  command: "XCH{code}"
  params:
    - name: code
      type: string
      description: "000-255 = channel, UP, DOWN"
- id: xch_query
  label: XM Channel Number Query
  kind: query
  command: "XCHQSTN"
  params: []
- id: xct_set
  label: XM Category
  kind: action
  command: "XCT{code}"
  params:
    - name: code
      type: string
      description: "10-char category, UP, DOWN"
- id: xct_query
  label: XM Category Query
  kind: query
  command: "XCTQSTN"
  params: []

# ---------------- SIRIUS ----------------
- id: scn_query
  label: SIRIUS Channel Name Query
  kind: query
  command: "SCNQSTN"
  params: []
- id: sat_query
  label: SIRIUS Artist Name Query
  kind: query
  command: "SATQSTN"
  params: []
- id: sti_query
  label: SIRIUS Title Query
  kind: query
  command: "STIQSTN"
  params: []
- id: sch_set
  label: SIRIUS Channel Number
  kind: action
  command: "SCH{code}"
  params:
    - name: code
      type: string
      description: "000-255 = channel, UP, DOWN"
- id: sch_query
  label: SIRIUS Channel Number Query
  kind: query
  command: "SCHQSTN"
  params: []
- id: sct_set
  label: SIRIUS Category
  kind: action
  command: "SCT{code}"
  params:
    - name: code
      type: string
      description: "10-char category, UP, DOWN"
- id: sct_query
  label: SIRIUS Category Query
  kind: query
  command: "SCTQSTN"
  params: []
- id: slk_set
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK{code}"
  params:
    - name: code
      type: string
      description: "nnnn = 4-digit lock password, INPUT = prompt, WRONG = wrong-password"
  notes: "INPUT/WRONG cause the device to display a message; no state change."

# ---------------- HD Radio ----------------
- id: hat_query
  label: HD Radio Artist Name Query
  kind: query
  command: "HATQSTN"
  params: []
- id: hcn_query
  label: HD Radio Channel Name Query
  kind: query
  command: "HCNQSTN"
  params: []
- id: hti_query
  label: HD Radio Title Query
  kind: query
  command: "HTIQSTN"
  params: []
- id: hds_query
  label: HD Radio Detail Title Query
  kind: query
  command: "HDSQSTN"
  params: []
- id: hpr_set
  label: HD Radio Channel Program
  kind: action
  command: "HPR{code}"
  params:
    - name: code
      type: string
      description: "01-08 = HD Radio channel program"
- id: hpr_query
  label: HD Radio Channel Program Query
  kind: query
  command: "HPRQSTN"
  params: []
- id: hbl_set
  label: HD Radio Blend Mode
  kind: action
  command: "HBL{code}"
  params:
    - name: code
      type: string
      description: "00 = Auto, 01 = Analog"
- id: hbl_query
  label: HD Radio Blend Mode Query
  kind: query
  command: "HBLQSTN"
  params: []
- id: hts_query
  label: HD Radio Tuner Status Query
  kind: query
  command: "HTSQSTN"
  params: []

# ---------------- Network / Net-Tune / USB ----------------
- id: ntc_play
  label: Net-Tune/USB PLAY
  kind: action
  command: "NTCPLAY"
  params: []
- id: ntc_stop
  label: Net-Tune/USB STOP
  kind: action
  command: "NTCSTOP"
  params: []
- id: ntc_pause
  label: Net-Tune/USB PAUSE
  kind: action
  command: "NTCPAUSE"
  params: []
- id: ntc_trup
  label: Net-Tune/USB Track Up
  kind: action
  command: "NTCTRUP"
  params: []
- id: ntc_trdn
  label: Net-Tune/USB Track Down
  kind: action
  command: "NTCTRDN"
  params: []
- id: ntc_ff
  label: Net-Tune/USB FF (continuous)
  kind: action
  command: "NTCFF"
  params: []
- id: ntc_rew
  label: Net-Tune/USB REW (continuous)
  kind: action
  command: "NTCREW"
  params: []
- id: ntc_repeat
  label: Net-Tune/USB REPEAT
  kind: action
  command: "NTCREPEAT"
  params: []
- id: ntc_random
  label: Net-Tune/USB RANDOM
  kind: action
  command: "NTCRANDOM"
  params: []
- id: ntc_display
  label: Net-Tune/USB DISPLAY
  kind: action
  command: "NTCDISPLAY"
  params: []
- id: ntc_album
  label: Net-Tune/USB ALBUM
  kind: action
  command: "NTCALBUM"
  params: []
- id: ntc_artist
  label: Net-Tune/USB ARTIST
  kind: action
  command: "NTCARTIST"
  params: []
- id: ntc_genre
  label: Net-Tune/USB GENRE
  kind: action
  command: "NTCGENRE"
  params: []
- id: ntc_playlist
  label: Net-Tune/USB PLAYLIST
  kind: action
  command: "NTCPLAYLIST"
  params: []
- id: ntc_right
  label: Net-Tune/USB RIGHT
  kind: action
  command: "NTCRIGHT"
  params: []
- id: ntc_left
  label: Net-Tune/USB LEFT
  kind: action
  command: "NTCLEFT"
  params: []
- id: ntc_up
  label: Net-Tune/USB UP
  kind: action
  command: "NTCUP"
  params: []
- id: ntc_down
  label: Net-Tune/USB DOWN
  kind: action
  command: "NTCDOWN"
  params: []
- id: ntc_select
  label: Net-Tune/USB SELECT
  kind: action
  command: "NTCSELECT"
  params: []
- id: ntc_digit
  label: Net-Tune/USB Digit (0-9)
  kind: action
  command: "NTC{digit}"
  params:
    - name: digit
      type: string
      description: "0-9"
- id: ntc_delete
  label: Net-Tune/USB DELETE
  kind: action
  command: "NTCDELETE"
  params: []
- id: ntc_caps
  label: Net-Tune/USB CAPS
  kind: action
  command: "NTCCAPS"
  params: []
- id: ntc_location
  label: Net-Tune/USB LOCATION
  kind: action
  command: "NTCLOCATION"
  params: []
- id: ntc_language
  label: Net-Tune/USB LANGUAGE
  kind: action
  command: "NTCLANGUAGE"
  params: []
- id: ntc_setup
  label: Net-Tune/USB SETUP
  kind: action
  command: "NTCSETUP"
  params: []
- id: ntc_return
  label: Net-Tune/USB RETURN
  kind: action
  command: "NTCRETURN"
  params: []
- id: ntc_chup
  label: Net-Tune/USB CH UP (iRadio)
  kind: action
  command: "NTCCHUP"
  params: []
- id: ntc_chdn
  label: Net-Tune/USB CH DOWN (iRadio)
  kind: action
  command: "NTCCHDN"
  params: []
- id: nat_query
  label: Net/USB Artist Name Query
  kind: query
  command: "NATQSTN"
  params: []
- id: nal_query
  label: Net/USB Album Name Query
  kind: query
  command: "NALQSTN"
  params: []
- id: nti_query
  label: Net/USB Title Name Query
  kind: query
  command: "NTIQSTN"
  params: []
- id: ntm_query
  label: Net/USB Time Info Query
  kind: query
  command: "NTMQSTN"
  params: []
- id: ntr_query
  label: Net/USB Track Info Query
  kind: query
  command: "NTRQSTN"
  params: []
- id: nst_query
  label: Net/USB Play Status Query
  kind: query
  command: "NSTQSTN"
  params: []
- id: npr_set
  label: Internet Radio Preset
  kind: action
  command: "NPR{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (preset 1-40)"

# ---------------- RI system passthrough ----------------
- id: ccd_power
  label: CD Player Power Toggle
  kind: action
  command: "CCDPOWER"
  params: []
- id: ccd_track
  label: CD Player Track+
  kind: action
  command: "CCDTRACK"
  params: []
- id: ccd_play
  label: CD Player Play
  kind: action
  command: "CCDPLAY"
  params: []
- id: ccd_stop
  label: CD Player Stop
  kind: action
  command: "CCDSTOP"
  params: []
- id: ccd_pause
  label: CD Player Pause
  kind: action
  command: "CCDPAUSE"
  params: []
- id: ccd_skipf
  label: CD Player Skip >>
  kind: action
  command: "CCDSKIP.F"
  params: []
- id: ccd_skipr
  label: CD Player Skip <<
  kind: action
  command: "CCDSKIP.R"
  params: []
- id: ccd_memory
  label: CD Player Memory
  kind: action
  command: "CCDMEMORY"
  params: []
- id: ccd_clear
  label: CD Player Clear
  kind: action
  command: "CCDCLEAR"
  params: []
- id: ccd_repeat
  label: CD Player Repeat
  kind: action
  command: "CCDREPEAT"
  params: []
- id: ccd_random
  label: CD Player Random
  kind: action
  command: "CCDRANDOM"
  params: []
- id: ccd_disp
  label: CD Player Display
  kind: action
  command: "CCDDISP"
  params: []
- id: ccd_dmode
  label: CD Player D.MODE
  kind: action
  command: "CCDD.MODE"
  params: []
- id: ccd_ff
  label: CD Player FF
  kind: action
  command: "CCDFF"
  params: []
- id: ccd_rew
  label: CD Player REW
  kind: action
  command: "CCDREW"
  params: []
- id: ccd_opcl
  label: CD Player Open/Close
  kind: action
  command: "CCDOP/CL"
  params: []
- id: ccd_digit
  label: CD Player Digit (0-10)
  kind: action
  command: "CCD{digit}"
  params:
    - name: digit
      type: string
      description: "0-10"
- id: ccd_p10
  label: CD Player +10
  kind: action
  command: "CCD+10"
  params: []
- id: ccd_dskip
  label: CD Player DISC SKIP+
  kind: action
  command: "CCDD.SKIP"
  params: []
- id: ccd_discf
  label: CD Player DISC+
  kind: action
  command: "CCDDISC.F"
  params: []
- id: ccd_discr
  label: CD Player DISC-
  kind: action
  command: "CCDDISC.R"
  params: []
- id: ccd_disc
  label: CD Player DISC1-DISC6
  kind: action
  command: "CCD{disc}"
  params:
    - name: disc
      type: string
      description: "DISC1..DISC6"
- id: ccd_stby
  label: CD Player Standby
  kind: action
  command: "CCDSTBY"
  params: []
- id: ccd_pon
  label: CD Player Power On
  kind: action
  command: "CCDPON"
  params: []

- id: ct1_playf
  label: TAPE1 PLAY >
  kind: action
  command: "CT1PLAY.F"
  params: []
- id: ct1_playr
  label: TAPE1 PLAY <
  kind: action
  command: "CT1PLAY.R"
  params: []
- id: ct1_stop
  label: TAPE1 Stop
  kind: action
  command: "CT1STOP"
  params: []
- id: ct1_rcpau
  label: TAPE1 Rec/Pause
  kind: action
  command: "CT1RC/PAU"
  params: []
- id: ct1_ff
  label: TAPE1 FF
  kind: action
  command: "CT1FF"
  params: []
- id: ct1_rew
  label: TAPE1 REW
  kind: action
  command: "CT1REW"
  params: []

- id: ct2_playf
  label: TAPE2 PLAY >
  kind: action
  command: "CT2PLAY.F"
  params: []
- id: ct2_playr
  label: TAPE2 PLAY <
  kind: action
  command: "CT2PLAY.R"
  params: []
- id: ct2_stop
  label: TAPE2 Stop
  kind: action
  command: "CT2STOP"
  params: []
- id: ct2_rcpau
  label: TAPE2 Rec/Pause
  kind: action
  command: "CT2RC/PAU"
  params: []
- id: ct2_ff
  label: TAPE2 FF
  kind: action
  command: "CT2FF"
  params: []
- id: ct2_rew
  label: TAPE2 REW
  kind: action
  command: "CT2REW"
  params: []
- id: ct2_opcl
  label: TAPE2 Open/Close
  kind: action
  command: "CT2OP/CL"
  params: []
- id: ct2_skipf
  label: TAPE2 Skip >>
  kind: action
  command: "CT2SKIP.F"
  params: []
- id: ct2_skipr
  label: TAPE2 Skip <<
  kind: action
  command: "CT2SKIP.R"
  params: []
- id: ct2_rec
  label: TAPE2 Rec
  kind: action
  command: "CT2REC"
  params: []

- id: ceq_power
  label: GEQ Power Toggle
  kind: action
  command: "CEQPOWER"
  params: []
- id: ceq_preset
  label: GEQ Preset
  kind: action
  command: "CEQPRESET"
  params: []

- id: cdt_play
  label: DAT Play
  kind: action
  command: "CDTPLAY"
  params: []
- id: cdt_rcpau
  label: DAT Rec/Pause
  kind: action
  command: "CDTRC/PAU"
  params: []
- id: cdt_stop
  label: DAT Stop
  kind: action
  command: "CDTSTOP"
  params: []
- id: cdt_skipf
  label: DAT Skip >>
  kind: action
  command: "CDTSKIP.F"
  params: []
- id: cdt_skipr
  label: DAT Skip <<
  kind: action
  command: "CDTSKIP.R"
  params: []
- id: cdt_ff
  label: DAT FF
  kind: action
  command: "CDTFF"
  params: []
- id: cdt_rew
  label: DAT REW
  kind: action
  command: "CDTREW"
  params: []

- id: cdv_power
  label: DVD Player Power Toggle
  kind: action
  command: "CDVPOWER"
  params: []
- id: cdv_pwron
  label: DVD Player Power On
  kind: action
  command: "CDVPWRON"
  params: []
- id: cdv_pwroff
  label: DVD Player Power Off
  kind: action
  command: "CDVPWROFF"
  params: []
- id: cdv_play
  label: DVD Player Play
  kind: action
  command: "CDVPLAY"
  params: []
- id: cdv_stop
  label: DVD Player Stop
  kind: action
  command: "CDVSTOP"
  params: []
- id: cdv_skipf
  label: DVD Player Skip >>
  kind: action
  command: "CDVSKIP.F"
  params: []
- id: cdv_skipr
  label: DVD Player Skip <<
  kind: action
  command: "CDVSKIP.R"
  params: []
- id: cdv_ff
  label: DVD Player FF
  kind: action
  command: "CDVFF"
  params: []
- id: cdv_rew
  label: DVD Player REW
  kind: action
  command: "CDVREW"
  params: []
- id: cdv_pause
  label: DVD Player Pause
  kind: action
  command: "CDVPAUSE"
  params: []
- id: cdv_lastplay
  label: DVD Player Last Play
  kind: action
  command: "CDVLASTPLAY"
  params: []
- id: cdv_subton_off
  label: DVD Player Subtitle On/Off
  kind: action
  command: "CDVSUBTON/OFF"
  params: []
- id: cdv_subtitle
  label: DVD Player Subtitle
  kind: action
  command: "CDVSUBTITLE"
  params: []
- id: cdv_setup
  label: DVD Player Setup
  kind: action
  command: "CDVSETUP"
  params: []
- id: cdv_topmenu
  label: DVD Player Top Menu
  kind: action
  command: "CDVTOPMENU"
  params: []
- id: cdv_menu
  label: DVD Player Menu
  kind: action
  command: "CDVMENU"
  params: []
- id: cdv_up
  label: DVD Player Up
  kind: action
  command: "CDVUP"
  params: []
- id: cdv_down
  label: DVD Player Down
  kind: action
  command: "CDVDOWN"
  params: []
- id: cdv_left
  label: DVD Player Left
  kind: action
  command: "CDVLEFT"
  params: []
- id: cdv_right
  label: DVD Player Right
  kind: action
  command: "CDVRIGHT"
  params: []
- id: cdv_enter
  label: DVD Player Enter
  kind: action
  command: "CDVENTER"
  params: []
- id: cdv_return
  label: DVD Player Return
  kind: action
  command: "CDVRETURN"
  params: []
- id: cdv_discf
  label: DVD Player DISC+
  kind: action
  command: "CDVDISC.F"
  params: []
- id: cdv_discr
  label: DVD Player DISC-
  kind: action
  command: "CDVDISC.R"
  params: []
- id: cdv_audio
  label: DVD Player Audio
  kind: action
  command: "CDVAUDIO"
  params: []
- id: cdv_random
  label: DVD Player Random
  kind: action
  command: "CDVRANDOM"
  params: []
- id: cdv_opcl
  label: DVD Player Open/Close
  kind: action
  command: "CDVOP/CL"
  params: []
- id: cdv_angle
  label: DVD Player Angle
  kind: action
  command: "CDVANGLE"
  params: []
- id: cdv_digit
  label: DVD Player Digit (0-10)
  kind: action
  command: "CDV{digit}"
  params:
    - name: digit
      type: string
      description: "0-10"
- id: cdv_search
  label: DVD Player Search
  kind: action
  command: "CDVSEARCH"
  params: []
- id: cdv_disp
  label: DVD Player Display
  kind: action
  command: "CDVDISP"
  params: []
- id: cdv_repeat
  label: DVD Player Repeat
  kind: action
  command: "CDVREPEAT"
  params: []
- id: cdv_memory
  label: DVD Player Memory
  kind: action
  command: "CDVMEMORY"
  params: []
- id: cdv_clear
  label: DVD Player Clear
  kind: action
  command: "CDVCLEAR"
  params: []
- id: cdv_abr
  label: DVD Player A-B Repeat
  kind: action
  command: "CDVABR"
  params: []
- id: cdv_stepf
  label: DVD Player Step
  kind: action
  command: "CDVSTEP.F"
  params: []
- id: cdv_stepr
  label: DVD Player Step Back
  kind: action
  command: "CDVSTEP.R"
  params: []
- id: cdv_slowf
  label: DVD Player Slow
  kind: action
  command: "CDVSLOW.F"
  params: []
- id: cdv_slowr
  label: DVD Player Slow Back
  kind: action
  command: "CDVSLOW.R"
  params: []
- id: cdv_zoomtg
  label: DVD Player Zoom
  kind: action
  command: "CDVZOOMTG"
  params: []
- id: cdv_zoomup
  label: DVD Player Zoom Up
  kind: action
  command: "CDVZOOMUP"
  params: []
- id: cdv_zoomdn
  label: DVD Player Zoom Down
  kind: action
  command: "CDVZOOMDN"
  params: []
- id: cdv_progre
  label: DVD Player Progressive
  kind: action
  command: "CDVPROGRE"
  params: []
- id: cdv_vdoff
  label: DVD Player Video On/Off
  kind: action
  command: "CDVVDOFF"
  params: []
- id: cdv_conmem
  label: DVD Player Condition Memory
  kind: action
  command: "CDVCONMEM"
  params: []
- id: cdv_funmem
  label: DVD Player Function Memory
  kind: action
  command: "CDVFUNMEM"
  params: []
- id: cdv_disc
  label: DVD Player DISC1-DISC6
  kind: action
  command: "CDV{disc}"
  params:
    - name: disc
      type: string
      description: "DISC1..DISC6"
- id: cdv_foldup
  label: DVD Player Folder Up
  kind: action
  command: "CDVFOLDUP"
  params: []
- id: cdv_folddn
  label: DVD Player Folder Down
  kind: action
  command: "CDVFOLDDN"
  params: []
- id: cdv_pmode
  label: DVD Player Play Mode
  kind: action
  command: "CDVP.MODE"
  params: []
- id: cdv_asctg
  label: DVD Player Aspect Toggle
  kind: action
  command: "CDVASCTG"
  params: []
- id: cdv_cdpcd
  label: DVD Player CD Chain Repeat
  kind: action
  command: "CDVCDPCD"
  params: []
- id: cdv_mspup
  label: DVD Player Multi Speed Up
  kind: action
  command: "CDVMSPUP"
  params: []
- id: cdv_mspdn
  label: DVD Player Multi Speed Down
  kind: action
  command: "CDVMSPDN"
  params: []
- id: cdv_pct
  label: DVD Player Picture Control
  kind: action
  command: "CDVPCT"
  params: []
- id: cdv_rsctg
  label: DVD Player Resolution Toggle
  kind: action
  command: "CDVRSCTG"
  params: []
- id: cdv_init
  label: DVD Player Factory Reset
  kind: action
  command: "CDVINIT"
  params: []

- id: cmd_power
  label: MD Power Toggle
  kind: action
  command: "CMDPOWER"
  params: []
- id: cmd_play
  label: MD Play
  kind: action
  command: "CMDPLAY"
  params: []
- id: cmd_stop
  label: MD Stop
  kind: action
  command: "CMDSTOP"
  params: []
- id: cmd_ff
  label: MD FF
  kind: action
  command: "CMDFF"
  params: []
- id: cmd_rew
  label: MD REW
  kind: action
  command: "CMDREW"
  params: []
- id: cmd_pmode
  label: MD Play Mode
  kind: action
  command: "CMDP.MODE"
  params: []
- id: cmd_skipf
  label: MD Skip >>
  kind: action
  command: "CMDSKIP.F"
  params: []
- id: cmd_skipr
  label: MD Skip <<
  kind: action
  command: "CMDSKIP.R"
  params: []
- id: cmd_pause
  label: MD Pause
  kind: action
  command: "CMDPAUSE"
  params: []
- id: cmd_rec
  label: MD Rec
  kind: action
  command: "CMDREC"
  params: []
- id: cmd_memory
  label: MD Memory
  kind: action
  command: "CMDMEMORY"
  params: []
- id: cmd_disp
  label: MD Display
  kind: action
  command: "CMDDISP"
  params: []
- id: cmd_scroll
  label: MD Scroll
  kind: action
  command: "CMDSCROLL"
  params: []
- id: cmd_mscan
  label: MD Music Scan
  kind: action
  command: "CMDM.SCAN"
  params: []
- id: cmd_clear
  label: MD Clear
  kind: action
  command: "CMDCLEAR"
  params: []
- id: cmd_random
  label: MD Random
  kind: action
  command: "CMDRANDOM"
  params: []
- id: cmd_repeat
  label: MD Repeat
  kind: action
  command: "CMDREPEAT"
  params: []
- id: cmd_enter
  label: MD Enter
  kind: action
  command: "CMDENTER"
  params: []
- id: cmd_eject
  label: MD Eject
  kind: action
  command: "CMDEJECT"
  params: []
- id: cmd_digit
  label: MD Digit (0-10/0)
  kind: action
  command: "CMD{digit}"
  params:
    - name: digit
      type: string
      description: "0-10/0"
- id: cmd_track
  label: MD Track --/---
  kind: action
  command: "CMD{track}"
  params:
    - name: track
      type: string
      description: "nn/nnn"
- id: cmd_name
  label: MD Name
  kind: action
  command: "CMDNAME"
  params: []
- id: cmd_group
  label: MD Group
  kind: action
  command: "CMDGROUP"
  params: []
- id: cmd_stby
  label: MD Standby
  kind: action
  command: "CMDSTBY"
  params: []

- id: ccr_power
  label: CD-R Power Toggle
  kind: action
  command: "CCRPOWER"
  params: []
- id: ccr_pmode
  label: CD-R Play Mode
  kind: action
  command: "CCRP.MODE"
  params: []
- id: ccr_play
  label: CD-R Play
  kind: action
  command: "CCRPLAY"
  params: []
- id: ccr_stop
  label: CD-R Stop
  kind: action
  command: "CCRSTOP"
  params: []
- id: ccr_skipf
  label: CD-R Skip >>
  kind: action
  command: "CCRSKIP.F"
  params: []
- id: ccr_skipr
  label: CD-R Skip <<
  kind: action
  command: "CCRSKIP.R"
  params: []
- id: ccr_pause
  label: CD-R Pause
  kind: action
  command: "CCRPAUSE"
  params: []
- id: ccr_rec
  label: CD-R Rec
  kind: action
  command: "CCRREC"
  params: []
- id: ccr_clear
  label: CD-R Clear
  kind: action
  command: "CCRCLEAR"
  params: []
- id: ccr_repeat
  label: CD-R Repeat
  kind: action
  command: "CCRREPEAT"
  params: []
- id: ccr_digit
  label: CD-R Digit (0-10/0)
  kind: action
  command: "CCR{digit}"
  params:
    - name: digit
      type: string
      description: "0-10/0"
- id: ccr_track
  label: CD-R Track --/---
  kind: action
  command: "CCR{track}"
  params:
    - name: track
      type: string
      description: "nn/nnn"
- id: ccr_scroll
  label: CD-R Scroll
  kind: action
  command: "CCRSCROLL"
  params: []
- id: ccr_opcl
  label: CD-R Open/Close
  kind: action
  command: "CCROP/CL"
  params: []
- id: ccr_disp
  label: CD-R Display
  kind: action
  command: "CCRDISP"
  params: []
- id: ccr_random
  label: CD-R Random
  kind: action
  command: "CCRRANDOM"
  params: []
- id: ccr_memory
  label: CD-R Memory
  kind: action
  command: "CCRMEMORY"
  params: []
- id: ccr_ff
  label: CD-R FF
  kind: action
  command: "CCRFF"
  params: []
- id: ccr_rew
  label: CD-R REW
  kind: action
  command: "CCRREW"
  params: []
- id: ccr_stby
  label: CD-R Standby
  kind: action
  command: "CCRSTBY"
  params: []

# ---------------- Zone 2 ----------------
- id: zpw_set
  label: Zone 2 Power
  kind: action
  command: "ZPW{code}"
  params:
    - name: code
      type: string
      description: "00 = standby, 01 = on"
- id: zpw_query
  label: Zone 2 Power Query
  kind: query
  command: "ZPWQSTN"
  params: []
- id: zmt_set
  label: Zone 2 Muting
  kind: action
  command: "ZMT{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, TG = wrap"
- id: zmt_query
  label: Zone 2 Muting Query
  kind: query
  command: "ZMTQSTN"
  params: []
- id: zvl_set
  label: Zone 2 Volume
  kind: action
  command: "ZVL{code}"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100) or 00-50 hex (0-80), UP, DOWN"
- id: zvl_query
  label: Zone 2 Volume Query
  kind: query
  command: "ZVLQSTN"
  params: []
- id: ztn_set
  label: Zone 2 Tone
  kind: action
  command: "ZTN{code}"
  params:
    - name: code
      type: string
      description: "Bxx (-A..00..+A 2-step), Txx, BUP, BDOWN, TUP, TDOWN"
- id: ztn_query
  label: Zone 2 Tone Query
  kind: query
  command: "ZTNQSTN"
  params: []
- id: zbl_set
  label: Zone 2 Balance
  kind: action
  command: "ZBL{code}"
  params:
    - name: code
      type: string
      description: "xx (-A..00..+A 2-step), UP = to R, DOWN = to L"
- id: zbl_query
  label: Zone 2 Balance Query
  kind: query
  command: "ZBLQSTN"
  params: []
- id: slz_set
  label: Zone 2 Selector
  kind: action
  command: "SLZ{code}"
  params:
    - name: code
      type: string
      description: "00-04=VIDEO1-5, 10=DVD, 20=TAPE1, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/USB(Front), 2A=USB(Rear), 40=Universal PORT, 80=SOURCE"
- id: slz_query
  label: Zone 2 Selector Query
  kind: query
  command: "SLZQSTN"
  params: []
- id: tun_z2_set
  label: Zone 2 Tuning
  kind: action
  command: "TUN{code}"
  params:
    - name: code
      type: string
      description: "nnnnn = frequency, UP, DOWN (TUNER shared with MAIN)"
- id: tun_z2_query
  label: Zone 2 Tuning Query
  kind: query
  command: "TUNQSTN"
  params: []
- id: tuz_set
  label: Zone 2 Tuning (separated)
  kind: action
  command: "TUZ{code}"
  params:
    - name: code
      type: string
      description: "nnnnn = frequency, UP, DOWN"
- id: tuz_query
  label: Zone 2 Tuning (separated) Query
  kind: query
  command: "TUZQSTN"
  params: []
- id: prs_z2_set
  label: Zone 2 Preset
  kind: action
  command: "PRS{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40), UP, DOWN"
- id: prs_z2_query
  label: Zone 2 Preset Query
  kind: query
  command: "PRSQSTN"
  params: []
- id: prz_set
  label: Zone 2 Preset (separated)
  kind: action
  command: "PRZ{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40), UP, DOWN"
- id: prz_query
  label: Zone 2 Preset (separated) Query
  kind: query
  command: "PRZQSTN"
  params: []
- id: ntc_playz
  label: Zone 2 Net-Tune PLAY
  kind: action
  command: "NTCPLAYz"
  params: []
- id: ntc_stopz
  label: Zone 2 Net-Tune STOP
  kind: action
  command: "NTCSTOPz"
  params: []
- id: ntc_pausez
  label: Zone 2 Net-Tune PAUSE
  kind: action
  command: "NTCPAUSEz"
  params: []
- id: ntc_trupz
  label: Zone 2 Net-Tune TRACK UP
  kind: action
  command: "NTCTRUPz"
  params: []
- id: ntc_trdnz
  label: Zone 2 Net-Tune TRACK DOWN
  kind: action
  command: "NTCTRDNz"
  params: []
- id: ntz_play
  label: Zone 2 Network PLAY
  kind: action
  command: "NTZPLAY"
  params: []
- id: ntz_stop
  label: Zone 2 Network STOP
  kind: action
  command: "NTZSTOP"
  params: []
- id: ntz_pause
  label: Zone 2 Network PAUSE
  kind: action
  command: "NTZPAUSE"
  params: []
- id: ntz_trup
  label: Zone 2 Network TRACK UP
  kind: action
  command: "NTZTRUP"
  params: []
- id: ntz_trdn
  label: Zone 2 Network TRACK DOWN
  kind: action
  command: "NTZTRDN"
  params: []
- id: ntz_chup
  label: Zone 2 Network CH UP (iRadio)
  kind: action
  command: "NTZCHUP"
  params: []
- id: ntz_chdn
  label: Zone 2 Network CH DOWN (iRadio)
  kind: action
  command: "NTZCHDN"
  params: []
- id: npz_set
  label: Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40)"
- id: lmz_set
  label: Zone 2 Listening Mode
  kind: action
  command: "LMZ{code}"
  params:
    - name: code
      type: string
      description: "00=Stereo, 01=Direct, 0F=Mono, 12=Multiplex, 87=DVS(PL2), 88=DVS(NEO6)"
- id: ltz_set
  label: Zone 2 Late Night
  kind: action
  command: "LTZ{code}"
  params:
    - name: code
      type: string
      description: "00=Off, 01=Low, 02=High, UP=wrap"
- id: ltz_query
  label: Zone 2 Late Night Query
  kind: query
  command: "LTZQSTN"
  params: []
- id: raz_set
  label: Zone 2 Re-EQ/Academy Filter
  kind: action
  command: "RAZ{code}"
  params:
    - name: code
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=wrap"
- id: raz_query
  label: Zone 2 Re-EQ/Academy Query
  kind: query
  command: "RAZQSTN"
  params: []

# ---------------- Zone 3 ----------------
- id: pw3_set
  label: Zone 3 Power
  kind: action
  command: "PW3{code}"
  params:
    - name: code
      type: string
      description: "00 = standby, 01 = on"
- id: pw3_query
  label: Zone 3 Power Query
  kind: query
  command: "PW3QSTN"
  params: []
- id: mt3_set
  label: Zone 3 Muting
  kind: action
  command: "MT3{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, TG = wrap"
- id: mt3_query
  label: Zone 3 Muting Query
  kind: query
  command: "MT3QSTN"
  params: []
- id: vl3_set
  label: Zone 3 Volume
  kind: action
  command: "VL3{code}"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100) or 00-50 hex (0-80), UP, DOWN"
- id: vl3_query
  label: Zone 3 Volume Query
  kind: query
  command: "VL3QSTN"
  params: []
- id: tn3_set
  label: Zone 3 Tone
  kind: action
  command: "TN3{code}"
  params:
    - name: code
      type: string
      description: "Bxx, Txx (-A..00..+A 2-step), BUP, BDOWN, TUP, TDOWN"
- id: tn3_query
  label: Zone 3 Tone Query
  kind: query
  command: "TN3QSTN"
  params: []
- id: bl3_set
  label: Zone 3 Balance
  kind: action
  command: "BL3{code}"
  params:
    - name: code
      type: string
      description: "xx (-A..00..+A 2-step), UP = to R, DOWN = to L"
- id: bl3_query
  label: Zone 3 Balance Query
  kind: query
  command: "BL3QSTN"
  params: []
- id: sl3_set
  label: Zone 3 Selector
  kind: action
  command: "SL3{code}"
  params:
    - name: code
      type: string
      description: "00-06=VIDEO1-7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/USB(Front), 2A=USB(Rear), 40=Universal PORT, 30=MULTI CH, 31=XM*, 32=SIRIUS*, 80=SOURCE"
- id: sl3_query
  label: Zone 3 Selector Query
  kind: query
  command: "SL3QSTN"
  params: []
- id: tu3_set
  label: Zone 3 Tuning (separated)
  kind: action
  command: "TU3{code}"
  params:
    - name: code
      type: string
      description: "nnnnn = frequency, UP, DOWN"
- id: tu3_query
  label: Zone 3 Tuning (separated) Query
  kind: query
  command: "TU3QSTN"
  params: []
- id: pr3_set
  label: Zone 3 Preset (separated)
  kind: action
  command: "PR3{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40), UP, DOWN"
- id: pr3_query
  label: Zone 3 Preset (separated) Query
  kind: query
  command: "PR3QSTN"
  params: []
- id: nt3_play
  label: Zone 3 Network PLAY
  kind: action
  command: "NT3PLAY"
  params: []
- id: nt3_stop
  label: Zone 3 Network STOP
  kind: action
  command: "NT3STOP"
  params: []
- id: nt3_pause
  label: Zone 3 Network PAUSE
  kind: action
  command: "NT3PAUSE"
  params: []
- id: nt3_trup
  label: Zone 3 Network TRACK UP
  kind: action
  command: "NT3TRUP"
  params: []
- id: nt3_trdn
  label: Zone 3 Network TRACK DOWN
  kind: action
  command: "NT3TRDN"
  params: []
- id: nt3_chup
  label: Zone 3 Network CH UP (iRadio)
  kind: action
  command: "NT3CHUP"
  params: []
- id: nt3_chdn
  label: Zone 3 Network CH DOWN (iRadio)
  kind: action
  command: "NT3CHDN"
  params: []
- id: np3_set
  label: Zone 3 Internet Radio Preset
  kind: action
  command: "NP3{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40)"

# ---------------- Zone 4 ----------------
- id: pw4_set
  label: Zone 4 Power
  kind: action
  command: "PW4{code}"
  params:
    - name: code
      type: string
      description: "00 = standby, 01 = on"
- id: pw4_query
  label: Zone 4 Power Query
  kind: query
  command: "PW4QSTN"
  params: []
- id: mt4_set
  label: Zone 4 Muting
  kind: action
  command: "MT4{code}"
  params:
    - name: code
      type: string
      description: "00 = off, 01 = on, TG = wrap"
- id: mt4_query
  label: Zone 4 Muting Query
  kind: query
  command: "MT4QSTN"
  params: []
- id: vl4_set
  label: Zone 4 Volume
  kind: action
  command: "VL4{code}"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100) or 00-50 hex (0-80), UP, DOWN"
- id: vl4_query
  label: Zone 4 Volume Query
  kind: query
  command: "VL4QSTN"
  params: []
- id: sl4_set
  label: Zone 4 Selector
  kind: action
  command: "SL4{code}"
  params:
    - name: code
      type: string
      description: "00-06=VIDEO1-7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/USB(Front), 2A=USB(Rear), 40=Universal PORT, 30=MULTI CH, 31=XM*, 32=SIRIUS*, 80=SOURCE"
- id: sl4_query
  label: Zone 4 Selector Query
  kind: query
  command: "SL4QSTN"
  params: []
- id: tu4_set
  label: Zone 4 Tuning (separated)
  kind: action
  command: "TU4{code}"
  params:
    - name: code
      type: string
      description: "nnnnn = frequency, UP, DOWN"
- id: tu4_query
  label: Zone 4 Tuning (separated) Query
  kind: query
  command: "TU4QSTN"
  params: []
- id: pr4_set
  label: Zone 4 Preset (separated)
  kind: action
  command: "PR4{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40), UP, DOWN"
- id: pr4_query
  label: Zone 4 Preset (separated) Query
  kind: query
  command: "PR4QSTN"
  params: []
- id: nt4_play
  label: Zone 4 Network PLAY
  kind: action
  command: "NT4PLAY"
  params: []
- id: nt4_stop
  label: Zone 4 Network STOP
  kind: action
  command: "NT4STOP"
  params: []
- id: nt4_pause
  label: Zone 4 Network PAUSE
  kind: action
  command: "NT4PAUSE"
  params: []
- id: nt4_trup
  label: Zone 4 Network TRACK UP
  kind: action
  command: "NT4TRUP"
  params: []
- id: nt4_trdn
  label: Zone 4 Network TRACK DOWN
  kind: action
  command: "NT4TRDN"
  params: []
- id: np4_set
  label: Zone 4 Internet Radio Preset
  kind: action
  command: "NP4{code}"
  params:
    - name: code
      type: string
      description: "01-28 hex (1-40)"

# ---------------- Dock (via RI) ----------------
- id: cds_pwron
  label: Dock On
  kind: action
  command: "CDSPWRON"
  params: []
- id: cds_pwroff
  label: Dock Standby
  kind: action
  command: "CDSPWROFF"
  params: []
- id: cds_ply_res
  label: Dock Play/Resume
  kind: action
  command: "CDSPLY/RES"
  params: []
- id: cds_stop
  label: Dock Stop
  kind: action
  command: "CDSSTOP"
  params: []
- id: cds_skipf
  label: Dock Track Up
  kind: action
  command: "CDSSKIP.F"
  params: []
- id: cds_skipr
  label: Dock Track Down
  kind: action
  command: "CDSSKIP.R"
  params: []
- id: cds_pause
  label: Dock Pause
  kind: action
  command: "CDSPAUSE"
  params: []
- id: cds_ply_pau
  label: Dock Play/Pause
  kind: action
  command: "CDSPLY/PAU"
  params: []
- id: cds_ff
  label: Dock FF
  kind: action
  command: "CDSFF"
  params: []
- id: cds_rew
  label: Dock FR
  kind: action
  command: "CDSREW"
  params: []
- id: cds_album_up
  label: Dock Album Up
  kind: action
  command: "CDSALBUM+"
  params: []
- id: cds_album_dn
  label: Dock Album Down
  kind: action
  command: "CDSALBUM-"
  params: []
- id: cds_plist_up
  label: Dock Playlist Up
  kind: action
  command: "CDSPLIST+"
  params: []
- id: cds_plist_dn
  label: Dock Playlist Down
  kind: action
  command: "CDSPLIST-"
  params: []
- id: cds_chapt_up
  label: Dock Chapter Up
  kind: action
  command: "CDSCHAPT+"
  params: []
- id: cds_chapt_dn
  label: Dock Chapter Down
  kind: action
  command: "CDSCHAPT-"
  params: []
- id: cds_random
  label: Dock Shuffle
  kind: action
  command: "CDSRANDOM"
  params: []
- id: cds_repeat
  label: Dock Repeat
  kind: action
  command: "CDSREPEAT"
  params: []
- id: cds_mute
  label: Dock Mute
  kind: action
  command: "CDSMUTE"
  params: []
- id: cds_blight
  label: Dock Backlight
  kind: action
  command: "CDSBLIGHT"
  params: []
- id: cds_menu
  label: Dock Menu
  kind: action
  command: "CDSMENU"
  params: []
- id: cds_enter
  label: Dock Select
  kind: action
  command: "CDSENTER"
  params: []
- id: cds_up
  label: Dock Cursor Up
  kind: action
  command: "CDSUP"
  params: []
- id: cds_down
  label: Dock Cursor Down
  kind: action
  command: "CDSDOWN"
  params: []
```

## Feedbacks
```yaml
# All command mnemonics ending in "QSTN" return a Status Message with the same
# prefix (e.g. PWRQSTN -> "PWR00" / "PWR01"). The receiver echoes unsolicited
# Status Messages on state change within 50 msec.

- id: power_state
  type: enum
  values:
    - standby
    - on
  source_command: PWR
  query_command: PWRQSTN
  response: "PWR00|PWR01"
- id: audio_muting
  type: enum
  values:
    - off
    - on
  source_command: AMT
  query_command: AMTQSTN
- id: speaker_a
  type: enum
  values: [off, on]
  source_command: SPA
  query_command: SPAQSTN
- id: speaker_b
  type: enum
  values: [off, on]
  source_command: SPB
  query_command: SPBQSTN
- id: speaker_layout
  type: enum
  values: [sb, fh, fw]
  source_command: SPL
  query_command: SPLQSTN
- id: master_volume
  type: integer
  range: [0, 100]
  source_command: MVL
  query_command: MVLQSTN
  response: "MVLxx hex"
- id: tone_front
  type: string
  source_command: TFR
  query_command: TFRQSTN
  response: "TFRBxxTxx"
- id: tone_front_wide
  type: string
  source_command: TFW
  query_command: TFWQSTN
  response: "TFWBxxTxx"
- id: tone_front_high
  type: string
  source_command: TFH
  query_command: TFHQSTN
  response: "TFHBxxTxx"
- id: tone_center
  type: string
  source_command: TCT
  query_command: TCTQSTN
  response: "TCTBxxTxx"
- id: tone_surround
  type: string
  source_command: TSR
  query_command: TSRQSTN
  response: "TSRBxxTxx"
- id: tone_surround_back
  type: string
  source_command: TSB
  query_command: TSBQSTN
  response: "TSBBxxTxx"
- id: tone_subwoofer
  type: string
  source_command: TSW
  query_command: TSWQSTN
  response: "TSWBxx"
- id: sleep_timer
  type: integer
  range: [1, 90]
  source_command: SLP
  query_command: SLPQSTN
  response: "SLP01-5A hex (minutes)"
- id: subwoofer_temp_level
  type: string
  source_command: SWL
  query_command: SWLQSTN
  response: "SWL-F..00..+C hex (dB)"
- id: center_temp_level
  type: string
  source_command: CTL
  query_command: CTLQSTN
  response: "CTL-C..00..+C hex (dB)"
- id: display_mode
  type: string
  source_command: DIF
  query_command: DIFQSTN
- id: dimmer_level
  type: string
  source_command: DIM
  query_command: DIMQSTN
- id: audio_information
  type: string
  source_command: IFA
  query_command: IFAQSTN
  response: "nnnnn:nnnnn (',' separator of info)"
- id: video_information
  type: string
  source_command: IFV
  query_command: IFVQSTN
  response: "nnnnn:nnnnn (',' separator of info)"

- id: input_selector
  type: string
  source_command: SLI
  query_command: SLIQSTN
- id: recout_selector
  type: string
  source_command: SLR
  query_command: SLRQSTN
- id: audio_selector
  type: string
  source_command: SLA
  query_command: SLAQSTN
- id: video_output_selector
  type: string
  source_command: VOS
  query_command: VOSQSTN
- id: hdmi_output
  type: string
  source_command: HDO
  query_command: HDOQSTN
- id: monitor_out_resolution
  type: string
  source_command: RES
  query_command: RESQSTN
- id: isf_mode
  type: string
  source_command: ISF
  query_command: ISFQSTN

- id: listening_mode
  type: string
  source_command: LMD
  query_command: LMDQSTN
- id: late_night
  type: string
  source_command: LTN
  query_command: LTNQSTN
- id: reeq_academy
  type: string
  source_command: RAS
  query_command: RASQSTN
- id: reeq
  type: string
  source_command: RAS
  query_command: RASQSTN
- id: cinema_filter
  type: string
  source_command: RAS
  query_command: RASQSTN
- id: audyssey_calibration
  type: string
  source_command: ADY
  query_command: ADYQSTN
- id: audyssey_dynamic_eq
  type: string
  source_command: ADQ
  query_command: ADQQSTN
- id: audyssey_dynamic_volume
  type: string
  source_command: ADV
  query_command: ADVQSTN
- id: dolby_volume
  type: string
  source_command: DVL
  query_command: DVLQSTN
- id: music_optimizer
  type: string
  source_command: MOT
  query_command: MOTQSTN

- id: tuning_frequency
  type: string
  source_command: TUN
  query_command: TUNQSTN
- id: tuner_preset
  type: string
  source_command: PRS
  query_command: PRSQSTN
- id: xm_channel_name
  type: string
  source_command: XCN
  query_command: XCNQSTN
- id: xm_artist_name
  type: string
  source_command: XAT
  query_command: XATQSTN
- id: xm_title
  type: string
  source_command: XTI
  query_command: XTIQSTN
- id: xm_channel_number
  type: string
  source_command: XCH
  query_command: XCHQSTN
- id: xm_category
  type: string
  source_command: XCT
  query_command: XCTQSTN
- id: sirius_channel_name
  type: string
  source_command: SCN
  query_command: SCNQSTN
- id: sirius_artist_name
  type: string
  source_command: SAT
  query_command: SATQSTN
- id: sirius_title
  type: string
  source_command: STI
  query_command: STIQSTN
- id: sirius_channel_number
  type: string
  source_command: SCH
  query_command: SCHQSTN
- id: sirius_category
  type: string
  source_command: SCT
  query_command: SCTQSTN
- id: hd_radio_artist
  type: string
  source_command: HAT
  query_command: HATQSTN
- id: hd_radio_channel_name
  type: string
  source_command: HCN
  query_command: HCNQSTN
- id: hd_radio_title
  type: string
  source_command: HTI
  query_command: HTIQSTN
- id: hd_radio_detail_title
  type: string
  source_command: HDS
  query_command: HDSQSTN
- id: hd_radio_channel_program
  type: string
  source_command: HPR
  query_command: HPRQSTN
- id: hd_radio_blend_mode
  type: string
  source_command: HBL
  query_command: HBLQSTN
- id: hd_radio_tuner_status
  type: string
  source_command: HTS
  query_command: HTSQSTN
  response: "mmnnoo (mm: HD flag, nn: current program 01-08, oo: receivable program bits)"

- id: net_artist
  type: string
  source_command: NAT
  query_command: NATQSTN
- id: net_album
  type: string
  source_command: NAL
  query_command: NALQSTN
- id: net_title
  type: string
  source_command: NTI
  query_command: NTIQSTN
- id: net_time
  type: string
  source_command: NTM
  query_command: NTMQSTN
  response: "mm:ss/mm:ss (elapsed/total max 99:59)"
- id: net_track
  type: string
  source_command: NTR
  query_command: NTRQSTN
  response: "cccc/tttt (current/total max 9999)"
- id: net_play_status
  type: string
  source_command: NST
  query_command: NSTQSTN
  response: "prs (p: S/P/p/F/R play status; r: -/R/F/1 repeat)"

- id: zone2_power
  type: enum
  values: [standby, on]
  source_command: ZPW
  query_command: ZPWQSTN
- id: zone2_muting
  type: enum
  values: [off, on]
  source_command: ZMT
  query_command: ZMTQSTN
- id: zone2_volume
  type: integer
  range: [0, 100]
  source_command: ZVL
  query_command: ZVLQSTN
- id: zone2_tone
  type: string
  source_command: ZTN
  query_command: ZTNQSTN
- id: zone2_balance
  type: string
  source_command: ZBL
  query_command: ZBLQSTN
- id: zone2_selector
  type: string
  source_command: SLZ
  query_command: SLZQSTN
- id: zone2_late_night
  type: string
  source_command: LTZ
  query_command: LTZQSTN
- id: zone2_reeq_academy
  type: string
  source_command: RAZ
  query_command: RAZQSTN

- id: zone3_power
  type: enum
  values: [standby, on]
  source_command: PW3
  query_command: PW3QSTN
- id: zone3_muting
  type: enum
  values: [off, on]
  source_command: MT3
  query_command: MT3QSTN
- id: zone3_volume
  type: integer
  range: [0, 100]
  source_command: VL3
  query_command: VL3QSTN
- id: zone3_tone
  type: string
  source_command: TN3
  query_command: TN3QSTN
- id: zone3_balance
  type: string
  source_command: BL3
  query_command: BL3QSTN
- id: zone3_selector
  type: string
  source_command: SL3
  query_command: SL3QSTN

- id: zone4_power
  type: enum
  values: [standby, on]
  source_command: PW4
  query_command: PW4QSTN
- id: zone4_muting
  type: enum
  values: [off, on]
  source_command: MT4
  query_command: MT4QSTN
- id: zone4_volume
  type: integer
  range: [0, 100]
  source_command: VL4
  query_command: VL4QSTN
- id: zone4_selector
  type: string
  source_command: SL4
  query_command: SL4QSTN
```

## Variables
```yaml
# Discrete settable parameters are expressed as enum/range params on each
# parameterized action above (see MVL, TFR/TFW/TFH/TCT/TSR/TSB/TSW, SLI, RES,
# LMD, etc.). No additional free-form variables are documented beyond those.
```

## Events
```yaml
# Per section 2.3 the receiver emits unsolicited Status Messages when system
# state changes. Each message is the ISCP command + parameter (same shape as
# the Status Message returned for a QSTN question), framed in eISCP over TCP
# (RS-232 echoes only via Question Communication; unsolicited feedback
# requires the persistent TCP connection).
- id: unsolicited_status
  description: "Receiver-initiated notification of state change (eISCP/TCP only)."
  transport: tcp
  framing: "eISCP data payload: !1{CMD}{PARAM}[EOF][CR][LF]"
```

## Macros
```yaml
# No multi-step sequences are described explicitly in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements are stated in the source document.
```

## Notes
- ISCP frame: start `!`, unit-type `1` (Receiver), 3-char command, parameters, terminator. RS-232 terminator: `[CR]` or `[LF]` or `[CR][LF]`. eISCP/TCP terminator: `[EOF]` or `[EOF][CR]` or `[EOF][CR][LF]` (model-dependent).
- eISCP TCP framing: 16-byte BIGENDIAN header (`ISCP` + header size `0x00000010` + data size + version `0x01` + 3 reserved bytes `0x000000`) followed by the ISCP data payload.
- Source spec lists two TCP terminator forms; downstream code should accept any of `[EOF]`, `[EOF][CR]`, `[EOF][CR][LF]`.
- Receiver is expected to respond within 50 msec; inter-message interval on the wire should be ≥ 50 msec.
- The connection is point-to-point and must be held open continuously — unsolicited status messages will not be delivered if the TCP socket is closed.
- The same `TUN` / `PRS` mnemonic addresses both MAIN and Zone 2/3/4 tuner control; the source distinguishes `TUZ` / `PRZ` (Zone 2 separated), `TU3` / `PR3` (Zone 3), `TU4` / `PR4` (Zone 4).
- Zone-2 commands `ZVL`/`ZMT`/`ZPW` and Zone-2 tone/balance are valid only when MAIN is ON (`ZVL`); Zone-2 tone/balance additionally require Zone-2 to be powered or variable.
- Source is "Integra Serial Communication Protocol v1.15" — this is the same protocol family used by Onkyo TX-NR receivers (Integra is Onkyo's pro/CI sister brand).
- eISCP port 60128 is the documented default; receivers can be reconfigured in 49152–65535 via the receiver setup menu (and a standby cycle is required after the change).
- Some commands are model-conditional (XM, SIRIUS, HD Radio, Network/Net-Tune, Zone 2/3/4, Japanese-only Video Output Selector). No enumeration of per-model applicability exists in the source — downstream code must guard.
- The `DIF` mnemonic appears twice in the source (Display Information vs. Display Mode); both are emitted above with disambiguating ids.
- The `RAS` mnemonic appears three times (Re-EQ/Academy combined, Re-EQ only, Cinema Filter); all three are emitted above as separate parameterized actions sharing the same command template — downstream code must pick the variant supported by the target model.
- `CCD`/`CT1`/`CT2`/`CEQ`/`CDT`/`CDV`/`CMD`/`CCR`/`CDS` are RI-system passthroughs; the receiver re-emits them over its RI bus to a connected Onkyo RI device (CD player, tape, GEQ, DAT, DVD, MD, CD-R, Dock).

<!-- UNRESOLVED: firmware version compatibility not stated in source. The source is the Integra protocol document, not a model-specific manual, so per-model capability deltas (which zones are present, which tuners are built in, which listening modes decode, etc.) cannot be enumerated here. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-09-02T16:03:07.338Z
last_checked_at: 2026-10-07T20:50:13.041Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:50:13.041Z
matched_actions: 495
action_count: 495
confidence: medium
summary: "All 495 units match source mnemonics with correct params, transport values are stated in the source, and no source command is missing. The source is a generic Integra ISCP guide, so model-level applicability is only inferred. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Some commands (e.g. XM/SIRIUS/HD Radio/Network/Net-Tune) are model-conditional; downstream code must guard on device capability."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated in source. The source is the Integra protocol document, not a model-specific manual, so per-model capability deltas (which zones are present, which tuners are built in, which listening modes decode, etc.) cannot be enumerated here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
